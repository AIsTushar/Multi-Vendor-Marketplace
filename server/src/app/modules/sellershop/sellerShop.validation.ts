import { z } from "zod";

const createSellerShopSchema = z.object({
  shopName: z.string().min(1, "Shop name is required").max(255),
  shopDescription: z.string().optional().nullable(),
  shopAddress: z.string().optional(),
});
const updateSellerShopSchema = z.object({
  shopName: z.string().min(1, "Shop name is required").max(255).optional(),
  shopDescription: z.string().optional().nullable(),
  shopAddress: z.string().optional().nullable(),
});

export const SellerShopValidations = {
  createSellerShopSchema,
  updateSellerShopSchema,
};
