import express from "express";
import { ProductsController } from "./products.controller";

const router = express.Router();
router.get("/products", ProductsController.products);
router.get("/products/:productId", ProductsController.productById);
router.put("/products/:productId", ProductsController.updateProduct);
router.delete("/products/:productId", ProductsController.deleteProduct);
router.post("/products", ProductsController.createProduct);
export const productsRoute = router;
