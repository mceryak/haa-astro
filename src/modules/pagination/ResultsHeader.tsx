import { useStore } from "@nanostores/react"
import { curPage, totalPages } from "./store"


export default function ResultsHeader() {
  const $totalPages = useStore(totalPages);
  const $curPage = useStore(curPage);
  return (
    <h1>{$totalPages > 0 ? `Page ${$curPage} of ${$totalPages}` : 'No results. Try removing some filters.'}</h1>
  )
}
