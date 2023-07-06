import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import Layout from "./Layout";
import { useContext, useState } from "react";
import FileDropZone from "./FileDropZone";
import { config } from "../config/config";
import { AppContext } from "../contexts/AppContext";
import Autocomplete from "./Autocomplete";
import { getMenuCategoriesByLocationId, getSelectedLocationId } from "../utils";
interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}
const NewMenu = ({ open, setOpen }: Props) => {
  const { fetchData, menuCategories, menuMenuCategoriesLocations } =
    useContext(AppContext);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const accessToken = localStorage.getItem("accessToken");
  const selectedLocationId = getSelectedLocationId();
  const validMenuCategory = getMenuCategoriesByLocationId(
    menuCategories,
    menuMenuCategoriesLocations
  );
  const mappedMenuCategories = validMenuCategory.map((item) => ({
    id: item.id as number,
    name: item.name,
  }));
  const [newMenu, setnewMenu] = useState({
    name: "",
    description: "",
    price: 0,
    assetUrl: "",
    locationId: selectedLocationId,
    menuCategoryIds: [] as number[],
  });
  const createNewMenu = async () => {
    const isValid = newMenu.name && newMenu.description;
    if (!isValid) return alert("Menu Name and Menu Description is Required...");
    if (selectedFiles.length) {
      const formData = new FormData();
      formData.append("files", selectedFiles[0]);
      const response = await fetch(`${config.apiBaseUrl}/assets`, {
        method: "POST",
        body: formData,
      });

      const responseData = await response.json();
      newMenu.assetUrl = responseData.assetUrl;
    }
    const response = await fetch(`${config.apiBaseUrl}/menus`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(newMenu),
    });
    accessToken && fetchData(accessToken);
    setOpen(false);
  };

  const onFileSelected = (selectedFiles: File[]) => {
    setSelectedFiles(selectedFiles);
  };
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle variant="h5">Create New Menu</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "400px",
          }}
        >
          <TextField
            placeholder="Name"
            type="text"
            onChange={(evt) => {
              setnewMenu({ ...newMenu, name: evt.target.value });
            }}
          ></TextField>
          <TextField
            placeholder="Description"
            type="text"
            sx={{ my: 3 }}
            onChange={(evt) => {
              setnewMenu({ ...newMenu, description: evt.target.value });
            }}
          ></TextField>
          <TextField
            placeholder="Prices"
            type="number"
            sx={{ mb: 3 }}
            onChange={(evt) => {
              setnewMenu({ ...newMenu, price: Number(evt.target.value) });
            }}
          ></TextField>
          <Autocomplete
            options={mappedMenuCategories}
            placeholder="menu-categories"
            label="menu-categories"
            onChange={(options) =>
              setnewMenu({
                ...newMenu,
                menuCategoryIds: options.map((item) => item.id),
              })
            }
          />
          <Box sx={{ mt: 2 }}>
            <FileDropZone onFileSelected={onFileSelected} />
            <Box sx={{ my: 1 }}>
              {selectedFiles.map((file) => {
                return (
                  <Chip
                    key={file.name}
                    label={file.name}
                    onDelete={() => {
                      const filteredSelectedFiles = selectedFiles.filter(
                        (selectedFile) => selectedFile.name !== file.name
                      );
                      setSelectedFiles(filteredSelectedFiles);
                    }}
                    sx={{ my: 0.5 }}
                  />
                );
              })}
            </Box>
          </Box>
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
            onClick={createNewMenu}
          >
            CreateMenu
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default NewMenu;
