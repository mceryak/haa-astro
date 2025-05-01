import type { Home, RelatedFile } from "@/content.config";
// import { useState } from "react";
import { queryParams } from "@/modules/readQueryParams/store";
import { useStore } from "@nanostores/react";
import { applyFilters } from "@/modules/filters/utils/applyFilters";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { curPage, totalPages } from "@/modules/pagination/store";
import { useEffect } from "react";
import HomeCard from "./HomeCard";

type Props = {
  homes: Home[]
}

export default function Homes({ homes }: Props) {
  // const [curPage, setCurPage] = useState(1);
  const $filters = useStore(queryParams);
  const $curPage = useStore(curPage);

  const filteredHomes = applyFilters($filters, homes);

  const perPage = 12.0;
  const total = Math.ceil(filteredHomes.length / perPage);
  const startIdx = perPage * ($curPage - 1);
  const stopIdx = Math.min(startIdx + perPage, filteredHomes.length);

  const thisPageHomes = filteredHomes.slice(startIdx, stopIdx);

  useEffect(() => { window.scrollTo(0, 0); }, [$curPage]);
  useEffect(() => { totalPages.set(total); }, [total]);
  
  return thisPageHomes.map((home) => (
    <HomeCard home={home} />
  ));
}
