import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { userController } from "./user.controller";
import { UserValidation } from "./user.validation";
import auth from "../../middleware/auth";
import { Role } from "@prisma/client";
import { parseBodyMiddleware } from "../../middleware/parseBodyData";
import { uploadSingleImage } from "../../helper/cloudinary";

const route = Router();

route.post(
  "/create",
  validateRequest(UserValidation.createValidation),
  userController.createUserController
);

route.put(
  "/change-password",
  auth(),
  validateRequest(UserValidation.changePasswordValidation),
  userController.changePasswordController
);

route.put(
  "/me",
  auth(),
  uploadSingleImage,
  parseBodyMiddleware,
  userController.updateUserController
);
route.get("/me", auth(), userController.getMyProfileController);

export const userRoutes = route;
