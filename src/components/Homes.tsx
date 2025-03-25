import type { Home } from "@/content.config";
import { useState } from "react";
import { queryParams } from "@/modules/readQueryParams/store";
import { useStore } from "@nanostores/react";

export default function Homes({ homes }: { homes: Home[]}) {
  const [curPage, setCurPage] = useState(1);
  const $filters = useStore(queryParams);

  const filteredHomes = homes
    .filter(home =>
      $filters
        .keys()
        .reduce((passes, key) =>
          passes && (!$filters.get(key)!.length || $filters.get(key)!.includes(`${home[key]}`)),
          true
        )
    );
  
  return (
    <>
      {
        filteredHomes.map((home) => (
          <li key={home.modelNumber} className="bg-white rounded-md hover:scale-[102%] transition-transform cursor-pointer shadow">
            <a
              href={`/homes/${home.modelNumber}`}
            >
              <img src="/images/hero-temp.jpg" />
              <div className="p-3">
                <h3 className="font-bold text-2xl pb-2">{home.modelNumber}</h3>
                <div className="flex gap-2">
                  <p className="border-r-1 pr-2">{home.beds} beds</p>
                  <p className="border-r-1 pr-2">{home.baths} baths</p>
                  <p>3252 sq. ft.</p>
                </div>
              </div>
            </a>
          </li>
        ))
      }
    </>
  )
}
