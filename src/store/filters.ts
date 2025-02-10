import { atom } from 'nanostores';

type SearchFilters = {
  beds: Number[] 
}

export const $filters = atom<SearchFilters>({
  beds: []
});

export function setFilters(filters: SearchFilters) {
  $filters.set(filters);
}