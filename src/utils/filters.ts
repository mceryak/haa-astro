import type { Home } from "@/content.config";
import { populateFilterOptions } from "@/modules/filters/utils/getFilters";

export const getHomeFilters = (homes: Home[]) => populateFilterOptions(
  [
    { icon: 'home', options: [], homePageSize: 'sm', field: "type", label: "Type" },
    { icon: 'ruler-square', options: [], homePageSize: 'sm', field: "sqft", label: "Sq. Ft.", range: 200 },
    { icon: 'bed', options: [], homePageSize: 'md', field: "beds", label: "Beds" },
    { icon: 'bathtub', options: [], homePageSize: 'md', field: "baths", label: "Baths" },
    { icon: 'layers', options: [], field: "series", label: "Series" },
  ],
  homes
);