import { queryParams } from "@/modules/readQueryParams/store";
import { useStore } from "@nanostores/react";
import { memo } from "react";


const FilterList = memo(({ filterKey, options }: { filterKey: string, options: string[] }) => {
  const $filters = useStore(queryParams);
  
  const selected: string[] = $filters.get(filterKey) ?? [];
  // console.log('list filters', selected);

  const handleClick = (option: string) => {
    let newSelected = selected.includes(option) ? selected.filter(o => o !== option) : [...selected, option];
    // filters.set({ ...$filters, [filterKey]: newSelected });
    let newFilters = new Map<string, string[]>();
    [...$filters.keys(), filterKey].forEach(k => newFilters.set(k, k === filterKey ? newSelected : $filters.get(k) ?? []));
    // console.log(newFilters);
    queryParams.set(newFilters);
  }
  
  return <>{
    options.map((option: string) => { const isChecked = selected.includes(option); return (
      <li key={`${filterKey}-${option}`}  className="flex whitespace-nowrap gap-2 py-1 text-black">
        <input id={`${filterKey}-${option}-input`} type="checkbox" onChange={() => handleClick(option)} value={option} checked={isChecked} />
        <label htmlFor={`${filterKey}-${option}-input`} className="pl-2">{option}</label>
      </li>
    )})
  }</>;
});

export default FilterList;