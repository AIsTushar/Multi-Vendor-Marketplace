import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../middleware/sendResponse";
import { ExampleServices } from "./example.service";

const createExample = catchAsync(async (req, res) => {
  const result = await ExampleServices.createExample(req);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Example created successfully",
    data: result,
  });
});
const getExamples = catchAsync(async (req, res) => {
  const result = await ExampleServices.getExamples(req);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Examples retrieved successfully",
    data: result.data,
    meta: result.meta,
  });
});

const getExampleById = catchAsync(async (req, res) => {
  const result = await ExampleServices.getExampleById(req.params.slug);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Example retrieved successfully",
    data: result,
  });
});

const updateExample = catchAsync(async (req, res) => {
  const result = await ExampleServices.updateExample(req);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Example updated successfully",
    data: result,
  });
});

const deleteExample = catchAsync(async (req, res) => {
  await ExampleServices.deleteExample(req);
  sendResponse(res, {
    statusCode: StatusCodes.NO_CONTENT,
    success: true,
    message: "Example deleted successfully",
    data: null,
  });
});

export const ExampleControllers = {
  getExamples,
  getExampleById,
  updateExample,
  deleteExample,
  createExample,
};
