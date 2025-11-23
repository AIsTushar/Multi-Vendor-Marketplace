import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../middleware/sendResponse";
import { CategoryServices } from "./category.service";

const createCategory = catchAsync(async (req, res) => {
  const result = await CategoryServices.createCategory(req);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Category created successfully",
    data: result,
  });
});
const getCategorys = catchAsync(async (req, res) => {
  const result = await CategoryServices.getCategorys(req);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Categorys retrieved successfully",
    data: result.data,
    meta: result.meta,
  });
});

const getCategoryTree = catchAsync(async (req, res) => {
  const result = await CategoryServices.getCategoryTree(req);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Category tree retrieved successfully",
    data: result,
  });
});

const getCategoryById = catchAsync(async (req, res) => {
  const result = await CategoryServices.getCategoryById(req.params.slug);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Category retrieved successfully",
    data: result,
  });
});

const updateCategory = catchAsync(async (req, res) => {
  const result = await CategoryServices.updateCategory(req);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Category updated successfully",
    data: result,
  });
});

const deleteCategory = catchAsync(async (req, res) => {
  await CategoryServices.deleteCategory(req);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Category deleted successfully",
    data: null,
  });
});

// Attributes related controllers
const addAttributes = catchAsync(async (req, res) => {
  const result = await CategoryServices.addAttributes(req);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Attributes added successfully",
    data: result,
  });
});

const getAttributes = catchAsync(async (req, res) => {
  const result = await CategoryServices.getAttributes(req);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Attributes retrieved successfully",
    data: result,
  });
});

const updateAttribute = catchAsync(async (req, res) => {
  const result = await CategoryServices.updateAttribute(req);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Attribute updated successfully",
    data: result,
  });
});

const deleteAttribute = catchAsync(async (req, res) => {
  const result = await CategoryServices.deleteAttribute(req);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Attribute deleted successfully",
    data: result,
  });
});

export const CategoryControllers = {
  getCategorys,
  getCategoryTree,
  getCategoryById,
  updateCategory,
  deleteCategory,
  createCategory,
  addAttributes,
  getAttributes,
  updateAttribute,
  deleteAttribute,
};
