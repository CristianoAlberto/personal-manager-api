import { Request, Response } from "express";
import { ISale } from "./Sale.Interface";
export class SaleController {
    constructor(private service: ISale) { }
    getAllSales = async (req: Request, res: Response) => {
        const data = await this.service.getAllSales(Number(req.query.size), Number(req.query.page));
        return res.status(data.data.status).json(data)
    }
    getSalesById = async (req: Request, res: Response) => {
        const data = await this.service.getSalesById(req.params.id);
        return res.status(data.status).json(data)
    }
    sellProduct = async (req: Request, res: Response) => {
        const data = await this.service.sellProduct(req.body);
        return res.status(data.status).json(data)
    }
    updateSell = async (req: Request, res: Response) => {
        const data = await this.service.updateSell(req.params.id, req.body);
        return res.status(data.status).json(data);
    }
}