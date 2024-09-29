import { AppDataSource } from "../../db";
import { Sale } from "./Sale.Entity";
import { Product } from "../Product/Product.Entity";
import { Pagination, IPagination } from "../../utils/pagination";
import { Message, IMessage } from "../../utils/message";
import { ISale } from "./Sale.Interface";
import { ObjectId } from "mongodb";
import { saleSchema } from "../../utils/validate";

export class SaleRepository implements ISale {
    pagination: Pagination<Sale>
    message: Message<Sale>
    constructor() {
        this.pagination = new Pagination()
        this.message = new Message()
    }
    private readonly saleRepo = AppDataSource.getMongoRepository(Sale);
    private readonly productRepo = AppDataSource.getMongoRepository(Product);
    async getAllSales(size: number, perpage: number): Promise<IPagination<Sale>> {
        const findAll = await this.saleRepo.find({ deleteAt: null })
        const message = new Message<Sale[]>()
        return this.pagination.pagination({ size: size || 10, perpage: perpage || 1, data: message.message({ status: 200, message: 'Operação realizada com sucesso', data: findAll }) })
    }
    async getSalesById(id: string): Promise<IMessage<Sale>> {
        const findById = await this.saleRepo.findOneBy({ _id: new ObjectId(id), deleteAt: null })
        if (!findById) return this.message.message({ status: 404, message: 'Venda não encontrado' })
        return this.message.message({ status: 200, message: 'Sucesso', data: findById })
    }
    async sellProduct(sale: Sale): Promise<IMessage<Sale>> {
        try {
            const { error } = saleSchema.validate(sale);
            if (error) return this.message.message({ status: 400, message: `Erro de validação: ${error.details[0].message}` });
            const product = await this.validateProductQuantity(sale.reference)
            if (product === null) return this.message.message({ status: 404, message: "Produto não encontrado" })
            if (product.amount < sale.amount || product.amount == 0) return this.message.message({ status: 400, message: "Extoque insuficiente para esta venda" })
            sale.total = (sale.price * sale.amount) + sale.deliveryValue;
            await this.productRepo.updateOne(
                { _id: new ObjectId(product.id) },
                { $set: { amount: product.amount - sale.amount } }
            );
            const create = await this.saleRepo.save(sale)
            return this.message.message({ status: 200, message: 'Operação realizada com sucesso', data: create })
        } catch (error) {
            return this.message.message({ status: 500, message: `${error}` })
        }
    }
    async updateSell(id: string, sale: Sale): Promise<IMessage<Sale>> {
        const findById = await this.saleRepo.findOneBy({ _id: new ObjectId(id), deleteAt: null })
        if (!findById) return this.message.message({ status: 404, message: 'Venda não encontrado' })
        const product = await this.validateProductQuantity(findById.reference)

        /***    
         * Aqui tenho que validar bem quando quero actualizar para menos produtos 
         * para quando tem mais ele ja valida mais quando eu quero actulizar para menos
         * ou seja devolver o produto ai vem o problem 
         */
        if (product === null) return this.message.message({ status: 404, message: "Produto não encontrado" })
        if (product.amount + findById.amount < sale.amount || product.amount == 0) {
            //tenho que fazer o downgrading ou seja preciso apresenter a devolver o produto no estoque leva em conta a valida;ao tambem  ou seja falta mais um if
            if (product.amount + findById.amount > sale.amount || product.amount == 0) {

            }
            return this.message.message({ status: 400, message: "Extoque insuficiente para esta venda" })
        }
        if (sale.amount !== undefined && !Number.isNaN(sale.amount)) {
            console.log("Passei por aqui")
            sale.total = (sale.price * sale.amount) + sale.deliveryValue;
            await this.productRepo.updateOne(
                { _id: new ObjectId(product.id) },
                { $set: { amount: (product.amount + findById.amount) - sale.amount } }
            );
        }
        try {
            await this.saleRepo.save({ ...findById, ...sale })
            return this.message.message({ status: 200, message: 'Actualizado com sucesso' })
        } catch (error) {
            return this.message.message({ status: 500, message: `${error}` })
        }
    }
    delete(id: string): Promise<IMessage<Sale>> {
        throw new Error("Method not implemented.");
    }
    async totalIncome(): Promise<IMessage<number>> {
        try {
            const findAll = await this.saleRepo.find({ operation: true, deleteAt: null })
            if (!findAll) return { status: 404, message: "" }
            let totalIncome: number;
            findAll.forEach(element => {
                //     return totalIncome += element.amount;
            });
            return { status: 200, message: 'Actualizado com sucesso', data: 0 }
        } catch (error) {
            return { status: 500, message: `${error}` }
        }
    }
    totalLoss(): Promise<IMessage<number>> {
        throw new Error("Method not implemented.");
    }
    latestSales(): Promise<IMessage<Sale[]>> {
        throw new Error("Method not implemented.");
    }
    getSalesByRerence(rerence: string): Promise<IPagination<Sale>> {
        throw new Error("Method not implemented.");
    }
    getAllIncomes(): Promise<IPagination<Sale>> {
        throw new Error("Method not implemented.");
    }
    getAllLosses(): Promise<IPagination<Sale>> {
        throw new Error("Method not implemented.");
    }

    private async validateProductQuantity(reference: string): Promise<any | null> {
        const findByReference = await this.productRepo.findOneBy({ reference: reference.toUpperCase(), deletedAt: null })
        if (!findByReference) return null
        return { id: findByReference._id, amount: findByReference.amount };
    }
}

