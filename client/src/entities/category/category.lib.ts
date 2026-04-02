import type { CategoryDto, CategoriesDto } from "@/shared/api/api.types";
import type { Category, Categories } from "./category.types";

export function transformCategoryDtoToCategory(categoryDto: CategoryDto): Category {
  const category = categoryDto;

  return {
    id: category._id,
    title: category.title,
  };
}

export function transformCategoriesDtoToCategories(categoriesDto: CategoriesDto): Categories {
  return categoriesDto.map(transformCategoryDtoToCategory);
}
