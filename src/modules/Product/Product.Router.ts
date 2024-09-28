import { Router } from "express";
import { ProductController } from "./Product.Controller";
import { ProductRepository } from "./Product.Repository";

const router = Router();
const controller = new ProductController(new ProductRepository());

router.get("/", controller.getAllProduct);
router.get("/:id", controller.getProductById);
router.post("/", controller.createProduct);
router.put("/:id", controller.updateProduct);
router.delete("/:id", controller.delete);

export { router }