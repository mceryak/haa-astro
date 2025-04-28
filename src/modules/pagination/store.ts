import { atom } from "nanostores";


export const curPage = atom<number>(1);
export const totalPages = atom<number>(1); // Must be set by table component