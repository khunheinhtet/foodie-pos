import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { config } from "../config/config";
import { AppContext } from "../contexts/AppContext";
import { Menu } from "../typings/types";
import {
  getAccessToken,
  getLocationsByMenuCategoryId,
  getMenusByMenuCategoryId,
  getSelectedLocationId,
} from "../utils";
import Autocomplete from "./Autocomplete";
import DeleteDialog from "./DeleteDialog";
import Layout from "./Layout";
import MenuCard from "./MenuCard";

const EditMenuCategories = () => {
  const params = useParams();
  const navigate = useNavigate();
  const menuCategoryId = params.id as string;
  const accessToken = getAccessToken();
  const selectedLocationId = getSelectedLocationId();
  const {
    menus,
    menuCategories,
    locations,
    menuMenuCategoriesLocations,
    fetchData,
  } = useContext(AppContext);

  const validLocations = getLocationsByMenuCategoryId(
    locations,
    menuCategoryId,
    menuMenuCategoriesLocations
  );
  const validLocationsId = validLocations.map((item) => item.id);
  const validMenus = getMenusByMenuCategoryId(
    menus,
    menuCategoryId,
    menuMenuCategoriesLocations
  );

  const validMenusIds = validMenus.map((item) => item.id as number);
  const mappedValidLocations = validLocations.map((item) => ({
    id: item.id as number,
    name: item.name,
  }));

  const mappedLocations = locations.map((item) => ({
    id: item.id as number,
    name: item.name,
  }));

  const [newMenuCategory, setNewMenuCategory] = useState({
    id: menuCategoryId,
    name: "",
    locationIds: [] as number[],
  });
  const [selectedMenusIds, setSelectedMenusIds] = useState<number[]>([]);
  const mapedMenus = menus
    .map((item) => ({
      id: item.id as number,
      name: `${item.name}-${item.id}`,
    }))
    .filter((item) => !validMenusIds.includes(item.id));
  const [open, setOpen] = useState(false);
  const [openDeleteMenuCategoryDialog, setOpenDeleteMenuCategoryDialog] =
    useState(false);
  const [selectedMenu, setSelectedMenu] = useState<Menu>();

  const handleDeleteMenuFromMenuCategory = async () => {
    await fetch(`${config.apiBaseUrl}/menuCategories/${menuCategoryId}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${accessToken}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        locationId: selectedLocationId,
      }),
    });
    accessToken && fetchData(accessToken);
    navigate("/menu-categories");
  };
  const handleRemoveMenuFromMenuCategory = async () => {
    await fetch(`${config.apiBaseUrl}/menuCategories/removeMenu`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        menuId: selectedMenu?.id,
        menuCategoryId,
        locationId: selectedLocationId,
      }),
    });
    accessToken && fetchData(accessToken);
  };
  const handleAddMenusToAddonCategories = async () => {
    await fetch(`${config.apiBaseUrl}/menuCategories/addMenu`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${accessToken}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        menuIds: selectedMenusIds,
        menuCategoryId,
        locationIds: validLocationsId,
      }),
    });
    accessToken && fetchData(accessToken);
  };
  if (!menuCategoryId) return null;
  const menuCategroy = menuCategories.find(
    (item) => item.id === Number(menuCategoryId)
  );
  if (!menuCategroy)
    return (
      <Layout>
        <Box>
          <Typography>Menu Categories Not Found!</Typography>
        </Box>
      </Layout>
    );
  const updateMenuCategory = async () => {
    await fetch(`${config.apiBaseUrl}/menuCategories`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(newMenuCategory),
    });
  };
  return (
    <Layout title="EditMenuCategory">
      <Box
        sx={{
          display: "flex",
          pt: 3,
          pl: 3,
          maxwidth: "800px",
          margin: "0 auto",
          flexDirection: "column",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <Button
            color="error"
            variant="contained"
            startIcon={<DeleteIcon />}
            sx={{ width: "fit-content" }}
            onClick={() => setOpenDeleteMenuCategoryDialog(true)}
          >
            Delete
          </Button>
        </Box>
        <TextField
          sx={{ mb: 2, width: "400px" }}
          defaultValue={menuCategroy.name}
          onChange={(evt) =>
            setNewMenuCategory({ ...newMenuCategory, name: evt.target.value })
          }
        />
        <Autocomplete
          options={mappedLocations}
          defaultValue={mappedValidLocations}
          label="Locations"
          placeholder="Locations"
          onChange={(options) =>
            setNewMenuCategory({
              ...newMenuCategory,
              locationIds: options.map((item) => item.id),
            })
          }
        />
        <Box>
          <Typography variant="h3" sx={{ mt: 2, mb: 2 }}>
            Menus
          </Typography>
          <Autocomplete
            options={mapedMenus}
            label="Menus"
            placeholder="Menus"
            onChange={(options) =>
              setSelectedMenusIds(options.map((item) => item.id))
            }
          />
          <Button
            variant="contained"
            onClick={handleAddMenusToAddonCategories}
            sx={{ mt: 2 }}
          >
            Add
          </Button>
        </Box>
        <Button
          variant="contained"
          sx={{ mt: 3, width: "fit-content" }}
          onClick={updateMenuCategory}
        >
          Update
        </Button>
        <Box
          sx={{
            my: 2,
            display: "flex",
            flexDirection: "row",
          }}
        >
          {validMenus.map((item) => {
            return (
              <Box
                sx={{
                  mr: 2,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
                key={item.id}
              >
                <MenuCard menu={item} />
                <Button
                  onClick={() => {
                    setOpen(true);
                    setSelectedMenu(item);
                  }}
                  variant="contained"
                  color="error"
                  sx={{ width: "fit-content" }}
                >
                  Remove
                </Button>
              </Box>
            );
          })}
        </Box>
      </Box>
      <DeleteDialog
        title="Are you sure to delete addons from menu category?"
        open={open}
        setOpen={setOpen}
        callback={handleRemoveMenuFromMenuCategory}
      />
      <DeleteDialog
        title="Are you sure to delete menu from menu category?"
        open={openDeleteMenuCategoryDialog}
        setOpen={setOpenDeleteMenuCategoryDialog}
        callback={handleDeleteMenuFromMenuCategory}
      />
    </Layout>
  );
};
export default EditMenuCategories;
