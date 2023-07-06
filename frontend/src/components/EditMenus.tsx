import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { config } from "../config/config";
import { AppContext } from "../contexts/AppContext";
import { Menu } from "../typings/types";
import { getAccessToken, getAddonCategoriesByMenusId } from "../utils";
import Autocomplete from "./Autocomplete";
import DeleteDialog from "./DeleteDialog";
import Layout from "./Layout";

const EditAddons = () => {
  const params = useParams();
  const menuId = params.id as string;
  const accessToken = getAccessToken();
  const { menus, fetchData, addonCategories, menusAddonCategories } =
    useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<Menu>();
  const [addonCategoryIds, setAddonCategoryIds] = useState<number[]>();
  const navigate = useNavigate();
  useEffect(() => {
    if (menus.length) {
      const validMenu = menus.find((item) => item.id === Number(menuId));
      setMenu(validMenu);
    }
  }, [menus]);
  const updateMenu = async () => {
    const payload = { ...menu, addonCategoryIds };
    if (!addonCategoryIds) return alert("you need to choose addon categories.");
    await fetch(`${config.apiBaseUrl}/menus`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${accessToken}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  };
  const validsAddonCategories = getAddonCategoriesByMenusId(
    addonCategories,
    menusAddonCategories,
    menuId
  );
  const mapedValidsAddonCategories = validsAddonCategories.map((item) => ({
    id: item.id as number,
    name: item.name,
  }));
  const mappedAddonCategories = addonCategories.map((item) => ({
    id: item.id as number,
    name: item.name,
  }));
  const handleDeleteMenu = async () => {
    await fetch(`${config.apiBaseUrl}/menus/${menuId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    accessToken && fetchData(accessToken);
    navigate("/menus");
  };
  if (!menu) return null;
  return (
    <Layout title="EditMenus">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          py: 3,
          px: 3,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <Button
            color="error"
            variant="contained"
            startIcon={<DeleteIcon />}
            sx={{ width: "fit-content" }}
            onClick={() => setOpen(true)}
          >
            Delete
          </Button>
        </Box>
        <TextField
          sx={{ mb: 2 }}
          defaultValue={menu.name}
          onChange={(evt) => setMenu({ ...menu, name: evt.target.value })}
        ></TextField>
        <TextField
          sx={{ mb: 2 }}
          type="number"
          defaultValue={menu.prices}
          onChange={(evt) =>
            setMenu({ ...menu, prices: Number(evt.target.value) })
          }
        ></TextField>
        <Autocomplete
          options={mappedAddonCategories}
          defaultValue={mapedValidsAddonCategories}
          label="addon categories"
          placeholder="addon categories"
          onChange={(options) =>
            setAddonCategoryIds(options.map((item) => item.id))
          }
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            onClick={updateMenu}
            sx={{ width: "fit-content", mt: 2 }}
          >
            Update
          </Button>
        </Box>
        <DeleteDialog
          title="Are you sure to delete this menu?"
          open={open}
          setOpen={setOpen}
          callback={handleDeleteMenu}
        />
      </Box>
    </Layout>
  );
};
export default EditAddons;
