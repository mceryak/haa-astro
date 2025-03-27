import { atom } from 'nanostores';

export type QueryParams = {
  [key: string]: string[]
}
const defaultQueryParams: QueryParams = {};
export const queryParams = atom(defaultQueryParams);