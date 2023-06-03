interface BaseType {
  id?: number;
  name: string;
}
export interface Menu extends BaseType {
  price: number;
  locationIds: number[];
  descriptions?: string;
  assetUrl?: string;
  isAvailable?: boolean;
}

export interface MenuCategory extends BaseType {}

export interface Addon extends BaseType {
  price: number;
  isAvailable: boolean;
  addonCategoriesIds: string[];
}
export interface AddonCategory extends BaseType {
  isRequired: boolean;
}
export interface Location extends BaseType {
  companyId?: string;
  address?: string;
}
export interface MenuLocation {
  id: number;
  menu_id: number;
  locations_id: number;
  is_available: boolean;
}

export interface Company {
  id?: string;
  name: string;
  address: string;
}
