import {
  Addon,
  AddonCategory,
  Location,
  Menu,
  MenuCategory,
  MenuMenuCategoriesLocations,
  MenusAddonCategories,
} from "../typings/types";

export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

export const getSelectedLocationId = () => {
  return localStorage.getItem("selectedLocationId");
};

export const getMenuCategoriesByLocationId = (
  menuCategories: MenuCategory[],
  menusMenuCategoriesLocations: MenuMenuCategoriesLocations[]
) => {
  const selectedLocationId = getSelectedLocationId();

  const validMenuCategoryIds = menusMenuCategoriesLocations
    .filter((item) => item.locations_id === Number(selectedLocationId))
    .map((item) => item.menu_categories_id);
  return menuCategories.filter((item) =>
    validMenuCategoryIds.includes(item.id as number)
  );
};

export const getMenuByLocationId = (
  menus: Menu[],
  menusMenuCategoriesLocations: MenuMenuCategoriesLocations[]
) => {
  const selectedLocationId = getSelectedLocationId();
  const validMenuIds = menusMenuCategoriesLocations
    .filter((item) => item.locations_id === Number(selectedLocationId))
    .map((item) => item.menus_id);
  return menus.filter((item) => validMenuIds.includes(item.id as number));
};

export const getAddonCategoriesByLocationId = (
  addonCategories: AddonCategory[],
  menusAddonCategories: MenusAddonCategories[],
  menuMenuCategoriesLocations: MenuMenuCategoriesLocations[]
) => {
  const selectedLocationId = getSelectedLocationId();

  const validMenuIds = menuMenuCategoriesLocations
    .filter(
      (item) =>
        item.locations_id && item.locations_id === Number(selectedLocationId)
    )
    .map((item) => item.menus_id);

  const validAddonCategoriesIds = menusAddonCategories
    .filter((item) => validMenuIds.includes(item.menus_id))
    .map((item) => item.addon_categories_id);

  return addonCategories.filter((item) =>
    validAddonCategoriesIds.includes(item.id as number)
  );
};
export const getAddonCategoriesByMenusId = (
  addonCategories: AddonCategory[],
  menusAddonCategories: MenusAddonCategories[],
  menuId: string
) => {
  const validAddonCategoryIds = menusAddonCategories
    .filter((item) => item.menus_id && item.menus_id === Number(menuId))
    .map((item) => item.addon_categories_id);

  return addonCategories.filter((item) =>
    validAddonCategoryIds.includes(item.id as number)
  );
};

export const getAddonByLocationIds = (
  addons: Addon[],
  addonCategories: AddonCategory[]
) => {
  const validAddonCategoriesIds = addonCategories.map(
    (item) => item.id as number
  );
  return addons.filter((item) =>
    validAddonCategoriesIds.includes(item.addon_categories_id)
  );
};

export const getLocationsByMenuCategoryId = (
  locations: Location[],
  menuCategoryId: string,
  menuMenuCategoriesLocations: MenuMenuCategoriesLocations[]
) => {
  const validLocationIds = menuMenuCategoriesLocations
    .filter((item) => item.locations_id === Number(menuCategoryId))
    .map((item) => item.locations_id);

  return locations.filter((item) =>
    validLocationIds.includes(item.id as number)
  );
};
export const getMenusByMenuCategoryId = (
  menus: Menu[],
  menuCategoryId: string,
  menuMenuCategoriesLocations: MenuMenuCategoriesLocations[]
) => {
  const selectedLocationId = getSelectedLocationId();
  const validMenusIds = menuMenuCategoriesLocations
    .filter(
      (item) =>
        item.menus_id &&
        item.menu_categories_id === Number(menuCategoryId) &&
        item.locations_id === Number(selectedLocationId)
    )
    .map((item) => item.menus_id);
  return menus.filter((item) => validMenusIds.includes(item.id as number));
};
