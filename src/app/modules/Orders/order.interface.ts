import { Model, Schema } from "mongoose";

export type IOrder = {
  _id?: string;
  email: string;
  productId: Schema.Types.ObjectId;
  price: number;
  quantity: number;
};
export type IOrderModel = Model<IOrder, Record<string, unknown>>;
