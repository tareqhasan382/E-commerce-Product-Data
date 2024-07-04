import { z } from "zod";
import { Types } from "mongoose";

export const OrderZodSchema = z.object({
  _id: z.string().optional(),
  email: z.string().email(),
  productId: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId",
  }),
  price: z.number().positive(),
  quantity: z.number().positive().int(),
});
