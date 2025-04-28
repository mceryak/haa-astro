import { useStore } from "@nanostores/react"
import { curPage, totalPages } from "./store"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";




export default function PageNavigation() {
  const $curPage = useStore(curPage);
  const $totalPages = useStore(totalPages);
  if ($totalPages <= 1) {
    return null;
  }
  return (
    <div className="my-5 gap-2 flex flex-col items-center">
        <ul className="flex gap-2 items-center ">
          
            <li className="w-10">
              <button className={`bg-slate-200 p-2 rounded-sm ${$curPage === 1 ? 'opacity-20' : 'cursor-pointer'}`} onClick={() => curPage.set($curPage - 1)} disabled={$curPage <= 1}>
                <FaChevronLeft />
              </button>
            </li>
          
          {Array.from({ length: $totalPages }, (_, i) => i + 1).map(page => (
            <li key={page} >
              <button 
                className={`p-1 px-3 rounded-sm  ${$curPage === page ? 'bg-slate-500 text-white' : 'bg-slate-200'} cursor-pointer`}
                onClick={() => curPage.set(page)}
              >{page}</button>
            </li>
          ))}
            <li className="w-10 flex justify-end">
              <button className={`bg-slate-200 p-2 rounded-sm ${$curPage === $totalPages ? 'opacity-20' : 'cursor-pointer'}`} onClick={() => curPage.set($curPage + 1)} disabled={$curPage >= $totalPages}>
                <FaChevronRight />
              </button>
            </li>
        </ul>
      </div>
  )
}
