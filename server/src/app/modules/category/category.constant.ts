import { NestedFilter } from "../../interface/nestedFiltering";
import { rangeFilteringPrams } from "../../../utils/queryBuilder";

// Fields for basic filtering
export const categoryFilterFields = [];

// Fields for top-level search
export const categorySearchFields = ["name"];

// Nested filtering config
export const categoryNestedFilters: NestedFilter[] = [
  // { key: "user", searchOption: "search", queryFields: ["name"] },
];

// Array-based filtering
export const categoryArrayFilterFields = [];

// Array-based filtering with multiple select not array
export const categoryMultiSelectNestedArrayFilters = [
  // {
  //   field: "option",
  //   relation: "option",
  //   matchField: "name",
  // },
];

// Range-based filtering config
export const categoryRangeFilter: rangeFilteringPrams[] = [
  {
    field: "createdAt",
    maxQueryKey: "maxDate",
    minQueryKey: "minDate",
    dataType: "date",
  },
];

// Prisma select configuration
export const categorySelect = {};

// Prisma include configuration
export const categoryInclude = {};
