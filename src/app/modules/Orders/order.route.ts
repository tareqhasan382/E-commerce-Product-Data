import { ordersController } from "./order.controller";
import express from "express";

// import validateRequest from "../../middlewares/validateRequest";

const router = express.Router();
router.get("/orders", ordersController.orders);
// router.get("/orders/:productId", ProductsController.productById);
// router.put("/orders/:productId", ProductsController.updateProduct);
// router.delete("/products/:productId", ProductsController.deleteProduct);
router.post("/orders", ordersController.createOrder);

export const ordersRoute = router;
