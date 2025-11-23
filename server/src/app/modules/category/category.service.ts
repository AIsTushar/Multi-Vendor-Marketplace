import { Request } from "express";
import { prisma } from "../../../utils/prisma";
import QueryBuilder from "../../../utils/queryBuilder";
import {
  categoryFilterFields,
  categoryNestedFilters,
  categoryRangeFilter,
  categorySearchFields,
  categoryMultiSelectNestedArrayFilters,
  categoryArrayFilterFields,
  categorySelect,
} from "./category.constant";

import { StatusCodes } from "http-status-codes";
import ApiError from "../../error/ApiErrors";
import { Prisma } from "@prisma/client";
import { generateSlugFromFields } from "../../../utils/slugify";
import { deleteFromCloudinary, getImageUrl } from "../../helper/cloudinary";

const createCategory = async (req: Request) => {
  const payload = req.body;

  const existing = await prisma.category.findUnique({
    where: { name: payload.name },
  });
  if (existing) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Category already exists");
  }

  payload.slug = await generateSlugFromFields(
    payload,
    ["name"],
    prisma.category
  );

  const image = req.file;
  if (!image) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Image is required");
  }
  payload.image = await getImageUrl(image);

  const category = await prisma.category.create({ data: payload });

  return category;
};

const getCategorys = async (req: Request) => {
  const queryBuilder = new QueryBuilder(req.query, prisma.category);
  const results = await queryBuilder
    .search(categorySearchFields)
    .paginate()
    .execute();

  const meta = await queryBuilder.countTotal();
  return { data: results, meta };
};

const getCategoryTree = async (req: Request) => {
  const categories = await prisma.category.findMany();

  const buildTree = (parentId: string | null): any[] => {
    return categories
      .filter((cat) => cat.parentId === parentId)
      .map((cat) => ({
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        image: cat.image,
        children: buildTree(cat.id),
      }));
  };

  return buildTree(null);
};

const getCategoryById = async (slug: string) => {
  return prisma.category.findUnique({
    where: { slug },
    include: { children: true },
  });
};

const updateCategory = async (req: Request) => {
  const { slug } = req.params;
  const data = req.body;

  const whereClause: Prisma.CategoryWhereUniqueInput = {
    slug,
  };

  const existing = await prisma.category.findUnique({ where: whereClause });
  if (!existing) {
    throw new ApiError(
      StatusCodes.NOT_FOUND,
      `Category not found with this id: ${slug}`
    );
  }

  if (data.parentId) {
    const parent = await prisma.category.findUnique({
      where: { id: data.parentId },
    });
    if (!parent) {
      throw new ApiError(
        StatusCodes.NOT_FOUND,
        `Parent category not found with this id: ${data.parentId}`
      );
    }

    if (existing.id === data.parentId) {
      throw new ApiError(
        StatusCodes.NOT_FOUND,
        "A category cannot be its own parent."
      );
    }
  }

  const image = req.file;
  if (image) {
    if (existing.image) {
      await deleteFromCloudinary(existing.image);
    }
    data.image = await getImageUrl(image);
  }

  if (data.name) {
    data.slug = await generateSlugFromFields(data, ["name"], prisma.category);
  }

  return prisma.category.update({
    where: whereClause,
    data: {
      ...data,
    },
  });
};

const deleteCategory = async (req: Request) => {
  const category = await prisma.category.findUnique({
    where: { slug: req.params.slug },
    include: { children: true, products: true, attributes: true },
  });

  console.log("Category: ", category);

  if (!category) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Category not found!");
  }

  if (category.children.length > 0) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "Category has subcategories, delete them first"
    );
  }
  if (category.products.length > 0) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "Category has products, delete them first"
    );
  }
  if (category.attributes.length > 0) {
    await prisma.attribute.deleteMany({
      where: {
        categoryId: category.id,
      },
    });
  }

  if (category.image) {
    await deleteFromCloudinary(category.image);
  }

  await prisma.category.delete({ where: { slug: req.params.slug } });
};

// Attributes related services
const addAttributes = async (req: Request) => {
  const { id: categoryId } = req.params;
  const data = req.body;

  if (!Array.isArray(data)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Attributes must be an array");
  }

  const attributesToCreate = data.map((attr: any) => {
    return {
      name: attr.name,
      type: attr.type,
      options:
        attr.type === "SELECT" && Array.isArray(attr.options)
          ? JSON.stringify(attr.options)
          : null,
      categoryId,
    };
  });

  const createdAttributes = await prisma.attribute.createMany({
    data: attributesToCreate,
  });

  return true;
};

const getAttributes = async (req: Request) => {
  const { id: categoryId } = req.params;

  const attributes = await prisma.attribute.findMany({
    where: { categoryId },
    orderBy: { createdAt: "asc" },
  });

  const formatted = attributes.map((attr) => ({
    ...attr,
    options:
      attr.type === "SELECT" && attr.options ? JSON.parse(attr.options) : null,
  }));

  return formatted;
};
const updateAttribute = async (req: Request) => {};
const deleteAttribute = async (req: Request) => {};

export const CategoryServices = {
  getCategorys,
  getCategoryById,
  updateCategory,
  deleteCategory,
  createCategory,
  getCategoryTree,

  addAttributes,
  getAttributes,
  updateAttribute,
  deleteAttribute,
};
