
import { NestedFilter } from "../../interface/nestedFiltering";
import { rangeFilteringPrams } from "../../../utils/queryBuilder";

// Fields for basic filtering
export const exampleFilterFields = [];

// Fields for top-level search
export const exampleSearchFields = [];

// Nested filtering config
export const exampleNestedFilters: NestedFilter[] = [
	// { key: "user", searchOption: "search", queryFields: ["name"] },

];

// Array-based filtering
export const exampleArrayFilterFields = [];

// Array-based filtering with multiple select not array
export const exampleMultiSelectNestedArrayFilters = [
  // {
  //   field: "option",
  //   relation: "option",
  //   matchField: "name",
  // },
];

// Range-based filtering config
export const exampleRangeFilter: rangeFilteringPrams[] = [
	{
		field: "createdAt",
		maxQueryKey: "maxDate",
		minQueryKey: "minDate",
		dataType: "date",
	},
];

// Prisma select configuration
export const exampleSelect = {
 
};

// Prisma include configuration
export const exampleInclude = {
	
};
