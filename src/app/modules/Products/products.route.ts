import express from "express";
import { ProductsController } from "./products.controller";
// import validateRequest from "../../middlewares/validateRequest";

const router = express.Router();
router.get("/products", ProductsController.products);
router.get("/products/:productId", ProductsController.productById);
router.put("/products/:productId", ProductsController.updateProduct);
router.delete("/products/:productId", ProductsController.deleteProduct);
// router.delete("/hotel/:id", HotelController.deleteHotelData);
router.post("/products", ProductsController.createProduct);

export const productsRoute = router;
