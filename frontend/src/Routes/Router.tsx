import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App";
import AddonCategories from "../components/AddonCategories";
import Addons from "../components/Addons";
import Locations from "../components/Locations";
import Login from "../components/Login";
import Logout from "../components/Logout";
import MenuCategories from "../components/MenuCategories";
import Menus from "../components/Menus";
import Register from "../components/Register";
import Settings from "../components/Settings";
import PrivateRoute from "./PrivateRoute";

import EditAddonCategory from "../components/EditAddonCategory";
import EditAddons from "../components/EditAddons";
import EditLocation from "../components/EditLocation";
import EditMenuCategories from "../components/EditMenuCategories";
import EditMenus from "../components/EditMenus";
import EditTable from "../components/EditTable";
import Tables from "../components/Tables";
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" Component={App}></Route>

          <Route path="/menus" Component={Menus}></Route>
          <Route path="/menus/:id" Component={EditMenus}></Route>
          <Route path="/Addons" Component={Addons}></Route>
          <Route path="/addons/:id" Component={EditAddons}></Route>
          <Route path="/menu-categories" Component={MenuCategories}></Route>
          <Route
            path="/menu-categories/:id"
            Component={EditMenuCategories}
          ></Route>
          <Route path="/addon-categories" Component={AddonCategories}></Route>
          <Route
            path="/addon-categories/:id"
            Component={EditAddonCategory}
          ></Route>
          <Route path="/tables" Component={Tables}></Route>
          <Route path="/tables/:id" Component={EditTable}></Route>

          <Route path="/Locations" Component={Locations}></Route>
          <Route path="/Locations/:id" Component={EditLocation}></Route>
          <Route path="/settings" Component={Settings}></Route>
        </Route>
        <Route path="/login" Component={Login}></Route>
        <Route path="/logout" Component={Logout}></Route>
        <Route path="/register" Component={Register}></Route>
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
