import { Add } from "@mui/icons-material";
import { Box, Button, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import { getAddonCategoriesByLocationId } from "../utils";
import CreateNewAddonCategories from "./CreateNewAddonCategories";
import Layout from "./Layout";
const AddonCategories = () => {
  const {
    addonCategories,
    menusAddonCategories,
    menuMenuCategoriesLocations,
    addons,
  } = useContext(AppContext);
  const validAddonCategories = getAddonCategoriesByLocationId(
    addonCategories,
    menusAddonCategories,
    menuMenuCategoriesLocations
  );
  const [open, setOpen] = useState(false);

  const getAddonsCount = (addonCategoryId?: number) => {
    if (!addonCategoryId) return 0;
    return addons.filter((item) => item.addon_categories_id === addonCategoryId)
      .length;
  };
  return (
    <Layout title="Addon-Categories">
      <Box sx={{ display: "flex", mt: 4, ml: 4, flexDirection: "column" }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <Button
            startIcon={<Add />}
            variant="contained"
            onClick={() => setOpen(true)}
          >
            Create New AddonCategories
          </Button>
        </Box>
        <Box sx={{ display: "flex" }}>
          {validAddonCategories.map((addonCategories, index) => {
            return (
              <Box sx={{ mr: 3 }} key={index}>
                <Link
                  to={`/addon-categories/${addonCategories.id}`}
                  style={{ textDecoration: "none", color: "#000000" }}
                >
                  <Paper
                    elevation={2}
                    sx={{
                      width: 170,
                      height: 170,
                      mr: 4,
                      mb: 5,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                      pl: 2,
                      pb: 2,
                    }}
                  >
                    <Typography gutterBottom variant="h5" component="div">
                      {addonCategories.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ textAlign: "justify" }}
                    >
                      {getAddonsCount(addonCategories.id)} addons
                    </Typography>
                  </Paper>
                </Link>
              </Box>
            );
          })}
        </Box>
      </Box>
      <CreateNewAddonCategories open={open} setOpen={setOpen} />
    </Layout>
  );
};

export default AddonCategories;
