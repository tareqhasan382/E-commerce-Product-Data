import { NextFunction, Request, Response } from "express";
import ProductModel from "./products.model";
import { IProduct } from "./products.interface";
import { ProductZodSchema } from "./products.validation";

const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const ZodvalidatedProduct = ProductZodSchema.parse(data);

    const result = await ProductModel.create(ZodvalidatedProduct);
    if (result) {
      return res.status(201).json({
        success: true,
        message: "Product created successfully!",
        data: result,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Failed to create Product.",
      });
    }
  } catch (error) {
    next(error);
  }
};
const products = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let result: IProduct[];

    if (req.query.searchTerm) {
      const searchTerm = req.query.searchTerm as string;
      const regex = new RegExp(searchTerm, "i");

      result = await ProductModel.find({
        $or: [
          { name: { $regex: regex } },
          { description: { $regex: regex } },
          { category: { $regex: regex } },
          { tags: { $in: [regex] } },
        ],
      });
    } else {
      result = await ProductModel.find({});
    }

    if (result.length > 0) {
      return res.status(200).json({
        success: true,
        message: req.query.searchTerm
          ? `Products matching search term '${req.query.searchTerm}' fetched successfully!`
          : "All products fetched successfully!",
        data: result,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: req.query.searchTerm
          ? `No products found matching search term '${req.query.searchTerm}'`
          : "No products found.",
      });
    }
  } catch (error) {
    next(error);
  }
};
const productById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const productId = req.params.productId;
    const result = await ProductModel.findById(productId);

    if (result) {
      return res.status(200).json({
        success: true,
        message: "Product fetched successfully!",
        data: result,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }
  } catch (error) {
    next(error);
  }
};
const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productId = req.params.productId;
    const updateData = req.body;
    // console.log("productId:", productId);
    // console.log("updateData:", updateData);
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productId,
      updateData,
      { new: true }
    );

    if (updatedProduct) {
      return res.status(200).json({
        success: true,
        message: "Product updated successfully!",
        data: updatedProduct,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }
  } catch (error) {
    next(error);
  }
};
const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productId = req.params.productId;
    const deletedProduct = await ProductModel.findByIdAndDelete(productId);

    if (deletedProduct) {
      return res.status(200).json({
        success: true,
        message: "Product deleted successfully!",
        data: deletedProduct,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const ProductsController = {
  createProduct,
  products,
  productById,
  updateProduct,
  deleteProduct,
};
