import { Router } from "express";
import { SaleController } from "./Sale.Controller";
import { SaleRepository } from "./Sale.Repository";

const router = Router();
const controller = new SaleController(new SaleRepository());

router.get("/", controller.getAllSales);
router.post("/", controller.sellProduct);
router.put("/:id", controller.updateSell)

export { router }