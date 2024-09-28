import { AppDataSource } from "../../db";
import { Pagination, IPagination } from "../../utils/pagination";
import { Message, IMessage } from "../../utils/message";
import { Product } from "./Product.Entity";
import { IProduct } from "./Product.Interface";

import { Validate } from "../../utils/validate";
import { ObjectId } from "mongodb";
export class ProductRepository implements IProduct {
    pagination: Pagination<Product>
    message: Message<Product>
    constructor() {
        this.pagination = new Pagination()
        this.message = new Message()
    }
    private readonly productRepo = AppDataSource.getMongoRepository(Product);
    private readonly validateField = new Validate();
    async getAllProducts(size: number, perpage: number): Promise<IPagination<Product>> {
        const findAll = await this.productRepo.find({ deleteAt: null })
        const message = new Message<Product[]>()
        return this.pagination.pagination({ size: size || 10, perpage: perpage || 1, data: message.message({ status: 200, message: 'Operação realizada com sucesso', data: findAll }) })
    }
    async getProductById(id: string): Promise<IMessage<Product>> {
        const findById = await this.productRepo.findOneBy({ _id: new ObjectId(id), deleteAt: null })
        if (!findById) return this.message.message({ status: 404, message: 'Produto não encontrado' })
        return this.message.message({ status: 200, message: 'Sucesso', data: findById })
    }
    async createProduct(product: Product): Promise<IMessage<Product>> {
        try {
            if (product.price <= 0) return this.message.message({ status: 404, message: "O campo price precisa ser maior que 0" })
            const validateEmptyFields = this.validateField.validateEmptyFields(['name', 'reference', 'amount', 'type'], product)
            if (validateEmptyFields) return this.message.message({ status: 400, message: `O campo ${validateEmptyFields} é obrigatório` })
            const create = await this.productRepo.save(product)
            return this.message.message({ status: 200, message: 'Operação realizada com sucesso', data: create })
        } catch (error) {
            return this.message.message({ status: 500, message: `${error}` })
        }
    }
    async updateProduct(id: string, product: Product): Promise<IMessage<Product>> {
        const findById = await this.getProductById(id)
        if (findById.status === 404) return findById
        try {
            await this.productRepo.save({ ...findById.data, ...product })
            return this.message.message({ status: 200, message: 'Actualizado com sucesso' })
        } catch (error) {
            return this.message.message({ status: 500, message: `${error}` })
        }
    }
    async delete(id: string): Promise<IMessage<Product>> {
        try {
            return await this.updateProduct(id, { deletedAt: new Date() } as Product)
        } catch (error) {
            return this.message.message({ status: 500, message: "Contacte o administrador" })
        }
    }

}