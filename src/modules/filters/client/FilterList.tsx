import { queryParams } from "@/modules/readQueryParams/store";
import { useStore } from "@nanostores/react";
import { memo } from "react";


const FilterList = memo(({ filterKey, options }: { filterKey: string, options: string[] }) => {
  const $filters = useStore(queryParams);
  
  const selected: string[] = $filters[filterKey] ?? [];
  // console.log('list filters', selected);

  const handleClick = (option: string) => {
    // let newSelected = selected.includes(option) ? selected.filter(o => o !== option) : [...selected, option];
    // let newFilters = new Map<string, string[]>();
    // [...$filters.keys(), filterKey].forEach(k => newFilters.set(k, k === filterKey ? newSelected : $filters.get(k) ?? []));
    // console.log(newFilters);
    queryParams.set({ ...$filters, [filterKey]: selected.includes(option) ? selected.filter(o => o !== option) : [...selected, option] });
  }
  
  return <>{
    options.map((option: string) => (
      <li key={`${filterKey}-${option}`}  style={{ display: "flex", alignItems: 'center', gap: "1rem", padding: 3, whiteSpace: "nowrap" }}>
        <input id={`${filterKey}-${option}-input`} type="checkbox" onChange={() => handleClick(option)} value={option} checked={selected.includes(option)} />
        <label htmlFor={`${filterKey}-${option}-input`} >{option}</label>
      </li>
    ))
  }</>;
});

export default FilterList;