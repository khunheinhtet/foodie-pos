import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useContext, useState } from "react";
import { config } from "../config/config";
import { AppContext } from "../contexts/AppContext";
import { getAccessToken, getSelectedLocationId } from "../utils";
interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}
const CreateTable = ({ open, setOpen }: Props) => {
  const { fetchData } = useContext(AppContext);
  const accessToken = getAccessToken();
  const selectedLocationId = getSelectedLocationId();
  const [newTable, setNewTable] = useState("");
  const createNewTable = async () => {
    if (!newTable) return alert("Table name is required...");
    await fetch(`${config.apiBaseUrl}/tables`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newTable, locationId: selectedLocationId }),
    });
    fetchData("accessToken");
    setOpen(false);
  };
  return (
    <Box>
      <Box>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Create New Table</DialogTitle>
          <DialogContent>
            <TextField
              placeholder="Enter Table Name"
              sx={{ width: "100%" }}
              onChange={(evt) => setNewTable(evt.target.value)}
            ></TextField>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
              <Button variant="contained" onClick={createNewTable}>
                Create
              </Button>
            </Box>
          </DialogContent>
        </Dialog>
      </Box>
    </Box>
  );
};

export default CreateTable;
