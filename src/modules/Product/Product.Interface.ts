import { IPagination } from "../../utils/pagination";
import { IMessage } from "../../utils/message";
import { Product } from "./Product.Entity";

export interface IProduct {
    getAllProducts(size: number, perpage: number): Promise<IPagination<Product>>;
    getProductById(id: string): Promise<IMessage<Product>>;
    createProduct(product: Product): Promise<IMessage<Product>>;
    updateProduct(id: string, product: Product): Promise<IMessage<Product>>;
    delete(id: string): Promise<IMessage<Product>>;
}