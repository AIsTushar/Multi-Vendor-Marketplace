import { Request } from "express";
import { prisma } from "../../../utils/prisma";
import QueryBuilder from "../../../utils/queryBuilder";
import {
  sellerShopFilterFields,
  sellerShopInclude,
  sellerShopNestedFilters,
  sellerShopRangeFilter,
  sellerShopSearchFields,
  sellerShopMultiSelectNestedArrayFilters,
  sellerShopArrayFilterFields,
  sellerShopSelect,
} from "./sellerShop.constant";
import config from "../../../config";
import { StatusCodes } from "http-status-codes";
import ApiError from "../../error/ApiErrors";
import { Prisma } from "@prisma/client";
import { getImageUrl } from "../../helper/cloudinary";

const createSellerShop = async (req: Request) => {
  const payload = req.body;

  const sellerShop = await prisma.sellerShop.create({ data: payload });

  return sellerShop;
};

const getSellerShops = async (req: Request) => {
  const queryBuilder = new QueryBuilder(req.query, prisma.sellerShop);
  const results = await queryBuilder
    .filter(sellerShopFilterFields)
    .search(sellerShopSearchFields)
    .arrayFieldHasSome(sellerShopArrayFilterFields)
    .multiSelectNestedArray(sellerShopMultiSelectNestedArrayFilters)
    .nestedFilter(sellerShopNestedFilters)
    .sort()
    .paginate()
    // .select(sellerShopSelect)
    //.include(sellershopInclude)
    .fields()
    .filterByRange(sellerShopRangeFilter)
    .execute();

  const meta = await queryBuilder.countTotal();
  return { data: results, meta };
};

const getSellerShopById = async (id: string) => {
  return prisma.sellerShop.findUnique({ where: { id } });
};

const updateSellerShop = async (req: Request) => {
  const { id } = req.params;
  const data = req.body;
  const user = req.user;
  const role = user?.role;

  const whereClause: Prisma.SellerShopWhereUniqueInput = {
    id,
  };

  const existing = await prisma.sellerShop.findUnique({ where: whereClause });
  if (!existing) {
    throw new ApiError(
      StatusCodes.NOT_FOUND,
      `SellerShop not found with this id: ${id}`
    );
  }

  return prisma.sellerShop.update({
    where: whereClause,
    data: {
      ...data,
    },
  });
};

const deleteSellerShop = async (req: Request) => {
  await prisma.sellerShop.delete({ where: { id: req.params.id } });
};

export const applySellerShop = async (req: Request) => {
  const userId = req.user?.id;

  // Check if already applied
  const shopExist = await prisma.sellerShop.findUnique({
    where: { userId },
  });

  if (shopExist) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "You already have a shop");
  }

  let imageUrl: string | null = null;
  let fileUrl: string | null = null;

  // Extract uploaded files
  if (req.files && typeof req.files === "object") {
    const imageFile = Array.isArray((req.files as any)["image"])
      ? (req.files as any)["image"][0]
      : undefined;

    if (!imageFile) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "Shop Image is required");
    }

    const shopFile = Array.isArray((req.files as any)["file"])
      ? (req.files as any)["file"][0]
      : undefined;

    if (!shopFile) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        "Verification Document is required"
      );
    }

    // Upload to Cloudinary
    if (imageFile) {
      imageUrl = await getImageUrl(imageFile);
    }
    if (shopFile) {
      fileUrl = await getImageUrl(shopFile);
    }
  }

  // Create shop record
  const createdShop = await prisma.sellerShop.create({
    data: {
      userId,
      shopName: req.body.shopName,
      shopDescription: req.body.shopDescription,
      shopAddress: req.body.shopAddress,
      shopLogo: imageUrl,
      verificationDoc: fileUrl,
    },
  });

  return createdShop;
};

const verifyShopRequest = async (req: Request) => {
  const { shopId, status } = req.body;
  const shop = await prisma.sellerShop.findUnique({ where: { id: shopId } });

  if (!shop) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Shop not found");
  }

  if (status !== "ACTIVE" && status !== "BLOCKED") {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid status");
  }

  return prisma.sellerShop.update({
    where: { id: shopId },
    data: {
      status,
    },
  });
};

export const SellerShopServices = {
  getSellerShops,
  getSellerShopById,
  updateSellerShop,
  deleteSellerShop,
  createSellerShop,
  applySellerShop,
  verifyShopRequest,
};
