import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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
const CareteNewAddon = ({ open, setOpen }: Props) => {
  const { addonCategories, fetchData } = useContext(AppContext);

  const accessToken = localStorage.getItem("accessToken");

  const addonCategoryIds = addonCategories.map((item) => ({
    id: item.id as number,
    name: item.name,
  }));

  const [newAddon, setNewAddon] = useState({
    name: "",
    price: 0,
    addonCategoryIds: [] as number[],
  });
  const createAddon = async () => {
    const isValid = newAddon.name && newAddon.price;
    if (!isValid)
      return alert("Addon Name and addon Categories are Required...");

    await fetch(`${config.apiBaseUrl}/addons`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(newAddon),
    });
    accessToken && fetchData(accessToken);
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle variant="h5">Create New Addon</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "400px",
          }}
        >
          <TextField
            placeholder="Name"
            type="text"
            onChange={(evt) => {
              setNewAddon({ ...newAddon, name: evt.target.value });
            }}
          ></TextField>
          <TextField
            placeholder="Price"
            type="number"
            sx={{ my: 3 }}
            onChange={(evt) => {
              setNewAddon({ ...newAddon, price: Number(evt.target.value) });
            }}
          ></TextField>
          <Autocomplete
            options={addonCategoryIds}
            label="addon categories"
            placeholder="addon categories"
            onChange={(options) =>
              setNewAddon({
                ...newAddon,
                addonCategoryIds: options.map((item) => item.id),
              })
            }
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
            onClick={createAddon}
          >
            CreateMenu
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default CareteNewAddon;
