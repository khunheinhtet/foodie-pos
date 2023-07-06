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
interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}
const CareteNewLocation = ({ open, setOpen }: Props) => {
  const { company, fetchData } = useContext(AppContext);

  const accessToken = localStorage.getItem("accessToken");

  const [newLocation, setNewLocation] = useState({
    name: "",
    address: "",
    companyId: company?.id,
  });
  const createLocation = async () => {
    const isValid = newLocation.name && newLocation.address;
    if (!isValid) return alert("Location Name and Address  are Required.");

    await fetch(`${config.apiBaseUrl}/locations`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(newLocation),
    });
    accessToken && fetchData(accessToken);
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle variant="h5">Create New Location</DialogTitle>
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
              setNewLocation({ ...newLocation, name: evt.target.value });
            }}
          ></TextField>
          <TextField
            placeholder="Adress"
            type="text"
            sx={{ my: 3 }}
            onChange={(evt) => {
              setNewLocation({
                ...newLocation,
                address: evt.target.value,
              });
            }}
          ></TextField>
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
            onClick={createLocation}
          >
            CreateLocation
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default CareteNewLocation;
