import { Request, Response } from "express";
import OrderModel from "./order.model";
import ProductModel from "../Products/products.model";

const createOrder = async (req: Request, res: Response) => {
  const { productId, quantity } = req.body;

  try {
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
    const result = await OrderModel.create(req.body);
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
    console.error("Error creating order:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
const orders = async (req: Request, res: Response) => {
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
    console.error("Error fetching orders:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const ordersController = {
  createOrder,
  orders,
};
