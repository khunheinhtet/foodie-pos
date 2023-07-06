import { Box, Paper, Typography } from "@mui/material";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import { getMenuCategoriesByLocationId } from "../utils";
import Layout from "./Layout";

const MenuCategories = () => {
  const { menuMenuCategoriesLocations, menuCategories } =
    useContext(AppContext);
  const validMenuCategories = getMenuCategoriesByLocationId(
    menuCategories,
    menuMenuCategoriesLocations
  );
  return (
    <Layout title="MenuCategories">
      <Box sx={{ display: "flex", pl: 3, pt: 3 }}>
        {validMenuCategories.map((item) => {
          return (
            <Link
              to={`/menu-categories/${item.id}`}
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
    </Layout>
  );
};

export default MenuCategories;
