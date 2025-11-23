import { Router } from "express";
import { SellerShopControllers } from "./sellerShop.controller";
import auth from "../../middleware/auth";
import { Role } from "@prisma/client";
import { parseBodyMiddleware } from "../../middleware/parseBodyData";
import validateRequest from "../../middleware/validateRequest";
import { SellerShopValidations } from "./sellerShop.validation";
import { uploadImageAndFile, uploadSingleImage } from "../../helper/cloudinary";

const router = Router();

router
  .route("/")
  .post(
    auth(),
    parseBodyMiddleware,
    validateRequest(SellerShopValidations.createSellerShopSchema),
    SellerShopControllers.createSellerShop
  )
  .get(auth(Role.ADMIN), SellerShopControllers.getSellerShops);

router
  .route("/apply")
  .post(
    auth(),
    uploadImageAndFile,
    parseBodyMiddleware,
    validateRequest(SellerShopValidations.createSellerShopSchema),
    SellerShopControllers.applySellerShop
  );

router
  .route("/verify-shop-request")
  .put(auth(Role.ADMIN), SellerShopControllers.verifyShopRequest);

router
  .route("/:id")
  .get(SellerShopControllers.getSellerShopById)
  .put(
    auth(),
    parseBodyMiddleware,
    validateRequest(SellerShopValidations.updateSellerShopSchema),
    SellerShopControllers.updateSellerShop
  )
  .delete(SellerShopControllers.deleteSellerShop);

export const SellerShopRoutes = router;
