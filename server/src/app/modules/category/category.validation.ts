import { z } from "zod";

const createCategorySchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(2, "Name must be at least 2 characters long")
    .max(255, "Name must be at most 255 characters long"),
  parentId: z.string().optional(),
});
const updateCategorySchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(2, "Name must be at least 2 characters long")
    .max(255, "Name must be at most 255 characters long")
    .optional(),
  parentId: z.string().optional(),
});

export const CategoryValidations = {
  createCategorySchema,
  updateCategorySchema,
};
