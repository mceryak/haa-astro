import { atom } from 'nanostores';

export const queryParams = atom(new Map<string, string[]>());