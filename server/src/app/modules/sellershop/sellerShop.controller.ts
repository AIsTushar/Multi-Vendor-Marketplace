import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../middleware/sendResponse";
import { SellerShopServices } from "./sellerShop.service";

const createSellerShop = catchAsync(async (req, res) => {
  const result = await SellerShopServices.createSellerShop(req);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "SellerShop created successfully",
    data: result,
  });
});
const getSellerShops = catchAsync(async (req, res) => {
  const result = await SellerShopServices.getSellerShops(req);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "SellerShops retrieved successfully",
    data: result.data,
    meta: result.meta,
  });
});

const getSellerShopById = catchAsync(async (req, res) => {
  const result = await SellerShopServices.getSellerShopById(req.params.id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "SellerShop retrieved successfully",
    data: result,
  });
});

const updateSellerShop = catchAsync(async (req, res) => {
  const result = await SellerShopServices.updateSellerShop(req);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "SellerShop updated successfully",
    data: result,
  });
});

const deleteSellerShop = catchAsync(async (req, res) => {
  await SellerShopServices.deleteSellerShop(req);
  sendResponse(res, {
    statusCode: StatusCodes.NO_CONTENT,
    success: true,
    message: "SellerShop deleted successfully",
    data: null,
  });
});

const applySellerShop = catchAsync(async (req, res) => {
  const result = await SellerShopServices.applySellerShop(req);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "SellerShop applied successfully",
    data: result,
  });
});

const verifyShopRequest = catchAsync(async (req, res) => {
  const result = await SellerShopServices.verifyShopRequest(req);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "SellerShop verified successfully",
    data: result,
  });
});

export const SellerShopControllers = {
  getSellerShops,
  getSellerShopById,
  updateSellerShop,
  deleteSellerShop,
  createSellerShop,
  applySellerShop,
  verifyShopRequest,
};
