import { Request, Response } from "express";
import { IProduct } from "./Product.Interface";

export class ProductController {
    constructor(private service: IProduct) { }

    getAllProduct = async (req: Request, res: Response) => {
        const data = await this.service.getAllProducts(Number(req.query.size), Number(req.query.page));
        return res.status(data.data.status).json(data)
    }
    getProductById = async (req: Request, res: Response) => {
        const data = await this.service.getProductById(req.params.id);
        return res.status(data.status).json(data)
    };
    createProduct = async (req: Request, res: Response) => {
        const data = await this.service.createProduct(req.body);
        return res.status(data.status).json(data)
    };
    updateProduct = async (req: Request, res: Response) => {
        const data = await this.service.updateProduct(req.params.id, req.body);
        return res.status(data.status).json(data)
    };
    delete = async (req: Request, res: Response) => {
        const data = await this.service.delete(req.params.id);
        return res.status(data.status).json(data)
    };
}