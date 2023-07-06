import { Add } from "@mui/icons-material";
import { Box, Button, Paper, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import CreateNewLocation from "./CreateNewLocation";
import Layout from "./Layout";

const Locations = () => {
  const { locations } = useContext(AppContext);
  const [open, setOpen] = useState(false);

  return (
    <Layout title="Locations">
      <Box sx={{ display: "flex", px: 3, pt: 3, flexDirection: "column" }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            startIcon={<Add />}
            variant="contained"
            onClick={() => setOpen(true)}
          >
            Create New Location
          </Button>
        </Box>
        <Box sx={{ display: "flex" }}>
          {locations &&
            locations.map((item) => {
              return (
                <Link
                  to={`/locations/${item.id}`}
                  key={item.id}
                  style={{ textDecoration: "none", color: "#000000" }}
                >
                  <Box>
                    <Paper
                      elevation={2}
                      sx={{
                        width: "170px",
                        height: "170px",
                        mr: 4,
                        mb: 5,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                        pl: 2,
                        pb: 2,
                      }}
                    >
                      <Typography sx={{ color: "#4C4C6D", fontWeight: "700" }}>
                        {item.name}
                      </Typography>
                    </Paper>
                  </Box>
                </Link>
              );
            })}
        </Box>
      </Box>
      <CreateNewLocation open={open} setOpen={setOpen} />
    </Layout>
  );
};

export default Locations;
