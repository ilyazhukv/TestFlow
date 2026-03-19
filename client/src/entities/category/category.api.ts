import { keepPreviousData, queryOptions } from "@tanstack/react-query";

import { transformCategoriesDtoToCategories } from "./category.lib";
import { Categories } from "./category.types";

import { getCategories } from "@/shared/api/api.service";
import { queryClient } from "@/shared/queryClient";

export const CATEGORIES_ROOT_QUERY_KEY = ["categories"];

export const categoriesQueryOptions = () =>
  queryOptions({
    queryKey: CATEGORIES_ROOT_QUERY_KEY,

    queryFn: async ({ signal }) => {
      const { data } = await getCategories({ signal });
      const categories = transformCategoriesDtoToCategories(data);

      return categories;
    },

    placeholderData: keepPreviousData,

    initialData: () =>
      queryClient.getQueryData<Categories>(CATEGORIES_ROOT_QUERY_KEY),

    initialDataUpdatedAt: () =>
      queryClient.getQueryState(CATEGORIES_ROOT_QUERY_KEY)?.dataUpdatedAt,
  });
