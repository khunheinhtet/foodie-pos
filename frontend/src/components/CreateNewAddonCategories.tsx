import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Switch,
  TextField,
} from "@mui/material";
import { useContext, useState } from "react";
import { config } from "../config/config";
import { AppContext } from "../contexts/AppContext";
import Autocomplete from "./Autocomplete";
interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}
const CreateNewAddonCategories = ({ open, setOpen }: Props) => {
  const { menus, fetchData } = useContext(AppContext);

  const accessToken = localStorage.getItem("accessToken");

  const mapedMenus = menus.map((item) => ({
    name: item.name,
    id: item.id as number,
  }));

  const [newAddonCategories, setnewAddonCategories] = useState({
    name: "",
    is_required: false,
    menuIds: [] as number[],
  });
  const createAddonCategory = async () => {
    const isValid = newAddonCategories.name;
    if (!isValid) return alert("AddonCategories Name is Required...");

    await fetch(`${config.apiBaseUrl}/addonCategories`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(newAddonCategories),
    });
    accessToken && fetchData(accessToken);
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle variant="h5">Create New AddonCategories</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "400px",
          }}
        >
          <TextField
            sx={{ mb: 2 }}
            placeholder="Name"
            type="text"
            onChange={(evt) => {
              setnewAddonCategories({
                ...newAddonCategories,
                name: evt.target.value,
              });
            }}
          ></TextField>

          <Autocomplete
            options={mapedMenus}
            label="addon categories"
            placeholder="addon categories"
            onChange={(options) =>
              setnewAddonCategories({
                ...newAddonCategories,
                menuIds: options.map((item) => item.id),
              })
            }
          />
          <FormControlLabel
            control={
              <Switch
                checked={newAddonCategories.is_required}
                onChange={(evt) =>
                  setnewAddonCategories({
                    ...newAddonCategories,
                    is_required: evt.target.checked,
                  })
                }
              />
            }
            label="is required"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Box>
          <Button
            variant="contained"
            sx={{
              width: "fit-content",
              mr: 1.5,
              mt: -2,
            }}
            onClick={createAddonCategory}
          >
            Create AddonCategories
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default CreateNewAddonCategories;
