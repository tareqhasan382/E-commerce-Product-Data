import { ordersController } from "./order.controller";
import express from "express";

// import validateRequest from "../../middlewares/validateRequest";

const router = express.Router();
router.get("/orders", ordersController.orders);
router.post("/orders", ordersController.createOrder);

export const ordersRoute = router;
