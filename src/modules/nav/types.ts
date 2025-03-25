export type MenuItem = {
  label: string;
  path: string;
  mobileOnly?: boolean;
  submenu?: MenuItem[];
};