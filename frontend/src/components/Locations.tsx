import { useContext, useState } from "react";
import Layout from "./Layout";
import { AppContext } from "../contexts/AppContext";
import { Box, Button, TextField, Typography } from "@mui/material";
import { config } from "../config/config";

const Locations = () => {
  const { locations, fetchData, company } = useContext(AppContext);
  console.log(company?.id);
  const [newLocation, setNewLocation] = useState({
    name: "",
    address: "",
    companyId: company?.id,
  });
  const accessToken = localStorage.getItem("accessToken");
  console.log(newLocation);
  const createNewLocation = async () => {
    await fetch(`${config.apiBaseUrl}/locations`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newLocation),
    });
    fetchData();
    setNewLocation({ name: "", address: "", companyId: company?.id });
  };
  const updateLocation = async () => {};
  return (
    <Layout title="Locations">
      <Box sx={{ mt: 3, ml: 3 }}>
        {locations.map((location, index) => {
          return (
            <Box sx={{ display: "flex", alignItems: "center" }} key={index}>
              <Typography variant="h5" sx={{ mr: 3 }}>
                {index + 1}.
              </Typography>
              <TextField
                defaultValue={location.name}
                sx={{ mr: 2, mb: 2 }}
              ></TextField>
              <TextField
                defaultValue={location.address}
                sx={{ mr: 2, mb: 2 }}
              ></TextField>
              <Button
                variant="contained"
                sx={{ mr: 2, mb: 2 }}
                onClick={updateLocation}
              >
                Update
              </Button>
            </Box>
          );
        })}
        <Box sx={{ display: "flex", alignItems: "center", ml: 5 }}>
          <TextField
            value={newLocation.name}
            sx={{ mr: 2, mb: 2 }}
            onChange={(evt) =>
              setNewLocation({ ...newLocation, name: evt.target.value })
            }
          ></TextField>
          <TextField
            value={newLocation.address}
            sx={{ mr: 2, mb: 2 }}
            onChange={(evt) =>
              setNewLocation({ ...newLocation, address: evt.target.value })
            }
          ></TextField>
          <Button
            variant="contained"
            sx={{ mr: 2, mb: 2 }}
            onClick={createNewLocation}
          >
            Create
          </Button>
        </Box>
      </Box>
    </Layout>
  );
};

export default Locations;
