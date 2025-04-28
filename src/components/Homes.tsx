import type { Home, RelatedFile } from "@/content.config";
// import { useState } from "react";
import { queryParams } from "@/modules/readQueryParams/store";
import { useStore } from "@nanostores/react";
import { applyFilters } from "@/modules/filters/utils/applyFilters";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { curPage, totalPages } from "@/modules/pagination/store";
import { useEffect } from "react";

type Props = {
  homes: Home[]
  cardClass: string,
  thumbUrlMap: { [key: string]: string }
}

export default function Homes({ homes, thumbUrlMap, cardClass }: Props) {
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
    <li key={home.modelNumber} className={cardClass}>
      <a
        href={`/homes/${home.modelNumber}`}
      >
        <img src={thumbUrlMap[home.modelNumber]} />
        <div className="p-3">
          <h3 className="font-bold text-2xl pb-2">{home.modelNumber}</h3>
          <div className="flex gap-2">
            <p className="border-r-1 pr-2">{home.beds} beds</p>
            <p className="border-r-1 pr-2">{home.baths} baths</p>
            <p>{home.sqft} sq. ft.</p>
          </div>
        </div>
      </a>
    </li>
  ));
}
