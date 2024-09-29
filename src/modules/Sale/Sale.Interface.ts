import { IPagination } from "../../utils/pagination";
import { IMessage } from "../../utils/message";
import { Sale } from "./Sale.Entity";

export interface ISale {
    getAllSales(size: number, perpage: number): Promise<IPagination<Sale>>;
    getSalesById(id: string): Promise<IMessage<Sale>>;
    sellProduct(sale: Sale): Promise<IMessage<Sale>>;
    updateSell(id: string, sale: Sale): Promise<IMessage<Sale>>;
    delete(id: string): Promise<IMessage<Sale>>;

    totalIncome(): Promise<IMessage<number>>;
    totalLoss(): Promise<IMessage<number>>;
    latestSales(): Promise<IMessage<Sale[]>>;
    getSalesByRerence(rerence: string): Promise<IPagination<Sale>>;
    getAllIncomes(): Promise<IPagination<Sale>>;
    getAllLosses(): Promise<IPagination<Sale>>;
}