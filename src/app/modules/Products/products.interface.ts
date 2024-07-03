import { Model } from "mongoose";

export type IProduct = {
  _id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  variants: Variant[];
  inventory: Inventory;
};
export type IProductModel = Model<IProduct, Record<string, unknown>>;

export interface Variant {
  type: string;
  value: string;
}

export interface Inventory {
  quantity: number;
  inStock: boolean;
}
