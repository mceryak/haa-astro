import type { Filter } from "../types";


const getRanges = (from: number, to: number, range: number): number[][] => {
  let res = [];
  for (let i = from; i < to; i += range) {
    console.log('from', i, 'to', i + range);
    res.push([i, i + range]);
  }
  return res;
}

export const populateFilterOptions = (filters: Filter[], products: object[]): Filter[] => {
  return [
    // process filters with ranges differently
    ...filters.filter(f => f.range).map(filter => ({
      filter,
      minMax: products.reduce((acc: number[], p) => { 
        const val = p[filter.field] as number;
        return [val < acc[0] ? val : acc[0], val >= acc[1] ? val + 1 : acc[1]];
      }, [999_999_999, 0])
    })).map(({ filter, minMax }) => ({
      ...filter,
      options: getRanges(Math.floor(minMax[0] / 100) * 100, Math.ceil(minMax[1] / 100) * 100, filter.range ?? 100).map(([start, end]) => `${start}-${end}`)
    })),

    // normal filters
    ...filters.filter(f => !f.range).map((filter) => ({
      ...filter,
      options: products
        .reduce((options: string[], product) => 
            options.includes(`${product[filter.field]}`)
              ? options
              : [...options, `${product[filter.field]}`], []
        )
        .toSorted(),
    }))
  ].toSorted((a, b) => filters.findIndex(f => f.field === a.field) - filters.findIndex(f => f.field === b.field));
}