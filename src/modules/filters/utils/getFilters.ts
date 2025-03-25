import type { Filter } from "../types";

export const getFilters = (filters: { field: string, label: string }[], products: object[]): Filter[] => {
  return filters.map((filter) => ({
    ...filter,
    options: products
      .reduce(
        (options: string[], product) =>
          options.includes(`${product[filter.field]}`)
            ? options
            : [...options, `${product[filter.field]}`],
        []
      )
      .toSorted(),
  }));
}