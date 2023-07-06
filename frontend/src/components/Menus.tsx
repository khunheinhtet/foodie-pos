import { Add } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { useContext, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import { getMenuByLocationId } from "../utils";
import NewMenu from "./CreateNewMenu";
import Layout from "./Layout";
import MenuCard from "./MenuCard";
const Menus = () => {
  const { menus, menuMenuCategoriesLocations } = useContext(AppContext);
  const validMenus = getMenuByLocationId(menus, menuMenuCategoriesLocations);
  const [open, setOpen] = useState(false);

  return (
    <Layout title="Menus">
      <Box sx={{ mt: 4, mx: 4 }}>
        <Box sx={{ mb: 1, display: "flex", justifyContent: "flex-end" }}>
          <Button
            startIcon={<Add />}
            variant="contained"
            onClick={() => setOpen(true)}
          >
            Create New Menu
          </Button>
        </Box>
        <Box sx={{ display: "flex" }}>
          {validMenus.map((menu, index) => {
            return <MenuCard key={menu.id} menu={menu} />;
          })}
        </Box>
        <Box>
          <NewMenu open={open} setOpen={setOpen} />
        </Box>
      </Box>
    </Layout>
  );
};

export default Menus;
