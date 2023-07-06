import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import Layout from "./Layout";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../contexts/AppContext";

const Settings = () => {
  const { locations } = useContext(AppContext);
  const [selectedLocationId, setSelectedLocationId] = useState<string>("");

  useEffect(() => {
    if (locations.length) {
      const locationIdFromLocalStorage =
        localStorage.getItem("selectedLocationId");
      if (locationIdFromLocalStorage) {
        setSelectedLocationId(locationIdFromLocalStorage);
      } else {
        const firstLocation = String(locations[0].id);
        setSelectedLocationId(firstLocation);
      }
    }
  }, [locations]);

  const handleChange = (event: SelectChangeEvent) => {
    const locationId = event.target.value;
    setSelectedLocationId(locationId);
    localStorage.setItem("selectedLocationId", event.target.value);
  };

  return (
    <Layout>
      <div>
        <h2>This is Settings Page</h2>
        <Box sx={{ maxWidth: 300, ml: 2 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Locations</InputLabel>
            <Select
              value={selectedLocationId}
              label="Locations"
              onChange={handleChange}
            >
              {locations.map((location) => (
                <MenuItem value={location.id} key={location.id}>
                  {location.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </div>
    </Layout>
  );
};

export default Settings;
