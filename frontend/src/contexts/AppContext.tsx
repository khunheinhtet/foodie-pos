import { createContext, useEffect, useState } from "react";
import { config } from "../config/config";
import {
  Addon,
  AddonCategory,
  Company,
  Location,
  Menu,
  MenuCategory,
  MenuMenuCategoriesLocations,
  MenusAddonCategories,
  Table,
} from "../typings/types";
import { getAccessToken } from "../utils";
interface AppContextType {
  menus: Menu[];
  menuCategories: MenuCategory[];
  addons: Addon[];
  addonCategories: AddonCategory[];
  locations: Location[];
  menusAddonCategories: MenusAddonCategories[];
  menuMenuCategoriesLocations: MenuMenuCategoriesLocations[];
  company: Company | null;
  tables: Table[];
  updateData: (value: any) => void;
  fetchData: (accessToken: string) => void;
}

export const defaultContext: AppContextType = {
  menus: [],

  menuCategories: [],
  addons: [],
  addonCategories: [],
  locations: [],
  menusAddonCategories: [],
  company: null,
  tables: [],
  menuMenuCategoriesLocations: [],
  updateData: () => {},
  fetchData: (accessToken: string) => {},
};

export const AppContext = createContext<AppContextType>(defaultContext);

const AppProvider = (props: any) => {
  const [data, updateData] = useState(defaultContext);
  const accessToken = getAccessToken();
  useEffect(() => {
    if (accessToken) {
      fetchData(accessToken);
    }
  }, [accessToken]);

  const fetchData = async (accessToken: string) => {
    if (!accessToken) return;

    const response = await fetch(`${config.apiBaseUrl}`, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
    const responseJson = await response.json();
    const {
      menus,
      menuCategories,
      addons,
      addonCategories,
      locations,
      menusAddonCategories,
      company,
      tables,
      menuMenuCategoriesLocations,
    } = responseJson;
    updateData({
      ...data,
      menus: menus,
      menuCategories,
      addons,
      addonCategories,
      locations,
      menusAddonCategories,
      company,
      tables,
      menuMenuCategoriesLocations,
    });
  };

  return (
    <AppContext.Provider value={{ ...data, updateData, fetchData }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppProvider;
