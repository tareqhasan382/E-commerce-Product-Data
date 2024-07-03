import { Schema, model } from "mongoose";
import { IProduct, IProductModel } from "./products.interface";

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    tags: { type: [String], required: true },
    variants: {
      type: [{ type: { type: String }, value: String }],
      required: true,
    },
    inventory: {
      quantity: { type: Number, required: true },
      inStock: { type: Boolean, required: true },
    },
  },
  { timestamps: true }
);

const ProductModel = model<IProduct, IProductModel>("products", productSchema);

export default ProductModel;
