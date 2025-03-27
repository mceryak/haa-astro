import type { QueryParams } from "@/modules/readQueryParams/store";

export const applyFilters = (filters: QueryParams, products: object[]) => {
  return products
  .filter(product =>
    Object.keys(filters)
      .reduce((passes, key) => {
        if (!passes) return false;

        const selected = filters[key];
        if (!selected.length) return true;

        const value = product[key];
        for (let item of selected) {
          if (item === `${value}`) { return true; }
          const rangeStrings = item.split('-');
          if (rangeStrings.length === 2) {
            const range = [parseInt(rangeStrings[0]), parseInt(rangeStrings[1])];
            if (value >= range[0] && value < range[1]) {
              return true;
            }
          }
        }
        return false;
      },
        // passes && (!$filters[key]!.length || $filters[key]!.includes(`${home[key]}`)),
        true
      )
  );
}