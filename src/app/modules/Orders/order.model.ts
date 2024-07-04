import { Schema, model } from "mongoose";
import { IOrder, IOrderModel } from "./order.interface";

const orderSchema = new Schema<IOrder>(
  {
    email: { type: String, required: true },
    productId: { type: Schema.Types.ObjectId, ref: "products", required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
  },
  { timestamps: true }
);

const OrderModel = model<IOrder, IOrderModel>("orders", orderSchema);

export default OrderModel;
