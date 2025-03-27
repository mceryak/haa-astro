

export type Filter = {
  field: string;
  label: string;
  options: string[];
  icon: string
  homePageSize?: 'sm' | 'md' | 'lg' | null | undefined
  range?: number | null | undefined
};