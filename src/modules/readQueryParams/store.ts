import { atom } from 'nanostores';

export type QueryParams = {
  [key: string]: string[]
}
const defaultQueryParams: QueryParams | null = null;
export const queryParams = atom(defaultQueryParams);