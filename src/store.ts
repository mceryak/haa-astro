import { atom } from 'nanostores';

interface StringIndexable {
  [key: string]: string[];
}

export type Filter = {
  
  beds: string[],
  baths: string[],
  series: string[]
}

// export const defaultFilters: Filter & Object = {
//   beds: [],
//   baths: [],
//   series: []
// }

export type FilterOption = {
  value: string | undefined | null,
  selected: boolean,
  count: number
}


const defaultBeds: number[] = [];
const defaultBaths: number[] = [];
const defaultSeries: string[] = [];

export const bedsFilter = atom(defaultBeds);
export const bathsFilter = atom(defaultBaths);
export const seriesFilter = atom(defaultSeries);


const defaultFilters: Map<string, string[]> = new Map();
export const filters = atom(defaultFilters);




// const defaultQueryParams: Map<string, string | string[]> = new Map();
export const queryParams = atom(new Map<string, string | string[]>());