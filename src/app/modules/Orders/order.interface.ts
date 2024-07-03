import { Model, Schema } from "mongoose";

export type IOrder = {
  _id?: string;
  email: string;
  productId: Schema.Types.ObjectId;
  price: number;
  quantity: number;
};
export type IOrderModel = Model<IOrder, Record<string, unknown>>;

// "email": "level2@programming-hero.com",
// "productId": "5fd67e890b60c903cd8544a3",
// "price": 999,
// "quantity": 1
