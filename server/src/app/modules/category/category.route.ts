import { Router } from "express";
import { CategoryControllers } from "./category.controller";
import auth from "../../middleware/auth";
import { Role } from "@prisma/client";
import { parseBodyMiddleware } from "../../middleware/parseBodyData";
import validateRequest from "../../middleware/validateRequest";
import { CategoryValidations } from "./category.validation";
import { uploadSingleImage } from "../../helper/cloudinary";
const router = Router();

router
  .route("/")
  .post(
    auth(Role.ADMIN),
    uploadSingleImage,
    parseBodyMiddleware,
    validateRequest(CategoryValidations.createCategorySchema),
    CategoryControllers.createCategory
  )
  .get(CategoryControllers.getCategorys);

router.route("/tree").get(CategoryControllers.getCategoryTree);

router
  .route("/:slug")
  .get(CategoryControllers.getCategoryById)
  .put(
    auth(),
    uploadSingleImage,
    parseBodyMiddleware,
    validateRequest(CategoryValidations.updateCategorySchema),
    CategoryControllers.updateCategory
  )
  .delete(auth(Role.ADMIN), CategoryControllers.deleteCategory);

router
  .route("/:id/attributes")
  .post(auth(Role.ADMIN), CategoryControllers.addAttributes)
  .get(CategoryControllers.getAttributes);

router
  .route("/attributes/:id")
  .put(auth(Role.ADMIN), CategoryControllers.updateAttribute)
  .delete(auth(Role.ADMIN), CategoryControllers.deleteAttribute);

export const CategoryRoutes = router;
