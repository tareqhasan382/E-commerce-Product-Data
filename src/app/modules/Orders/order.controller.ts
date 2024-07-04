import { NextFunction, Request, Response } from "express";
import OrderModel from "./order.model";
import ProductModel from "../Products/products.model";
import { OrderZodSchema } from "./order.validation";

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  const { productId, quantity } = req.body;

  try {
    const ZodvalidatedOrder = OrderZodSchema.parse(req.body);
    // Check if the product exists
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Check if there is sufficient quantity in inventory
    if (product.inventory.quantity < quantity) {
      return res.status(400).json({
        success: false,
        message: "Insufficient quantity available in inventory",
      });
    }

    // Calculate new inventory quantity and inStock status
    const newQuantity = product.inventory.quantity - quantity;
    const newInStock = newQuantity > 0;

    // Update product inventory
    await ProductModel.findByIdAndUpdate(productId, {
      $set: {
        "inventory.quantity": newQuantity,
        "inventory.inStock": newInStock,
      },
    });
    const result = await OrderModel.create(ZodvalidatedOrder);
    if (result) {
      return res.status(201).json({
        success: true,
        message: "Order created successfully!",
        data: result,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Failed to create Order.",
      });
    }
  } catch (error) {
    next(error);
  }
};
const orders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let result;

    if (req.query.email) {
      result = await OrderModel.find({ email: req.query.email });
    } else {
      result = await OrderModel.find({});
    }

    if (result.length > 0) {
      return res.status(200).json({
        success: true,
        message: "Orders fetched successfully!",
        data: result,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "No orders found.",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const ordersController = {
  createOrder,
  orders,
};
