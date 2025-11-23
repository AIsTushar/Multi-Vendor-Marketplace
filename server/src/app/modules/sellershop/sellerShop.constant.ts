
import { NestedFilter } from "../../interface/nestedFiltering";
import { rangeFilteringPrams } from "../../../utils/queryBuilder";

// Fields for basic filtering
export const sellerShopFilterFields = [];

// Fields for top-level search
export const sellerShopSearchFields = [];

// Nested filtering config
export const sellerShopNestedFilters: NestedFilter[] = [
	// { key: "user", searchOption: "search", queryFields: ["name"] },

];

// Array-based filtering
export const sellerShopArrayFilterFields = [];

// Array-based filtering with multiple select not array
export const sellerShopMultiSelectNestedArrayFilters = [
  // {
  //   field: "option",
  //   relation: "option",
  //   matchField: "name",
  // },
];

// Range-based filtering config
export const sellerShopRangeFilter: rangeFilteringPrams[] = [
	{
		field: "createdAt",
		maxQueryKey: "maxDate",
		minQueryKey: "minDate",
		dataType: "date",
	},
];

// Prisma select configuration
export const sellerShopSelect = {
 
};

// Prisma include configuration
export const sellerShopInclude = {
	
};
