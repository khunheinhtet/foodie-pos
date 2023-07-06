import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { config } from "../config/config";
import { AppContext } from "../contexts/AppContext";
import { Location } from "../typings/types";
import { getAccessToken } from "../utils";
import DeleteDialog from "./DeleteDialog";
import Layout from "./Layout";

const EditLocation = () => {
  const params = useParams();
  const locationId = params.id as string;
  const accessToken = getAccessToken();
  const { locations, fetchData } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState<Location>();
  const navigate = useNavigate();
  console.log(location);
  useEffect(() => {
    if (locations.length) {
      const validLocation = locations.find(
        (item) => item.id === Number(locationId)
      );
      setLocation(validLocation);
    }
  }, [locations]);
  const updateLocation = async () => {
    console.log(location?.name, location?.address);
    if (!location?.name && !location?.address) return;
    await fetch(`${config.apiBaseUrl}/locations/${locationId}`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${accessToken}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(location),
    });
    accessToken && fetchData(accessToken);
  };
  const handleDeleteLocation = async () => {
    await fetch(`${config.apiBaseUrl}/locations/${locationId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    accessToken && fetchData(accessToken);
    navigate("/locations");
  };
  if (!location) return null;
  return (
    <Layout title="EditAddons">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          margin: "0 auto",
          width: "500px",
          mt: 3,
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
          defaultValue={location.name}
          onChange={(evt) =>
            setLocation({ ...location, name: evt.target.value })
          }
        ></TextField>
        <TextField
          type="Address"
          defaultValue={location.address}
          onChange={(evt) =>
            setLocation({ ...location, address: evt.target.value })
          }
        ></TextField>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            onClick={updateLocation}
            sx={{ width: "fit-content", mt: 2 }}
          >
            Update
          </Button>
        </Box>
        <DeleteDialog
          title="Are you sure to delete this location?"
          open={open}
          setOpen={setOpen}
          callback={handleDeleteLocation}
        />
      </Box>
    </Layout>
  );
};
export default EditLocation;
