import { z } from "zod";

// Zod schema Variant
const VariantSchema = z.object({
  type: z.string(),
  value: z.string(),
});

// Zod schema Inventory
const InventorySchema = z.object({
  quantity: z.number(),
  inStock: z.boolean(),
});

// Zod schema Product
export const ProductZodSchema = z.object({
  _id: z.string().optional(),
  name: z.string({ required_error: "Name is required" }),
  description: z.string({ required_error: "Description is required" }),
  price: z.number({ required_error: "Price is required" }),
  category: z.string({ required_error: "Category is required" }),
  tags: z.array(z.string({ required_error: "Tags is required" })),
  variants: z
    .array(VariantSchema)
    .min(1, { message: "At least one variant is required" }),
  inventory: InventorySchema.required(),
});
