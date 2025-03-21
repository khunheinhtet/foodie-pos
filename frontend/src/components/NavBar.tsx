import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { TableBar } from "@mui/icons-material";
import CategoryIcon from "@mui/icons-material/Category";
import ClassIcon from "@mui/icons-material/Class";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export const sidebarMenuItems = [
  { id: 1, label: "Orders", icon: <LocalMallIcon />, route: "/" },
  { id: 2, label: "Menus", icon: <LocalDiningIcon />, route: "/menus" },
  {
    id: 3,
    label: "Menu Categories",
    icon: <CategoryIcon />,
    route: "/menu-categories",
  },
  { id: 4, label: "Addons", icon: <LunchDiningIcon />, route: "/addons" },
  {
    id: 5,
    label: "Addon Categories",
    icon: <ClassIcon />,
    route: "/addon-categories",
  },

  {
    id: 6,
    label: "Tables",
    icon: <TableBar />,
    route: "/tables",
  },
  {
    id: 7,
    label: "Locations",
    icon: <LocationOnIcon />,
    route: "/locations",
  },

  { id: 8, label: "Settings", icon: <SettingsIcon />, route: "/settings" },
];
interface Props {
  title?: string;
}
const NavBar = ({ title }: Props) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const navBarTitle = title ? `Foodie POS - ${title}` : "Foodie POS";

  const accessToken = localStorage.getItem("accessToken");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const renderDreawer = () => (
    <Box
      sx={{ auto: 250 }}
      role="presentation"
      onClick={() => setOpen(false)}
      onKeyDown={() => setOpen(false)}
    >
      <List>
        {sidebarMenuItems.slice(0, 7).map((menuItem) => (
          <Link
            to={menuItem.route}
            key={menuItem.id}
            style={{ textDecoration: "none", color: "black" }}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>{menuItem.icon}</ListItemIcon>
                <ListItemText primary={menuItem.label} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        {sidebarMenuItems.slice(-1).map((menuItem) => (
          <Link
            to={menuItem.route}
            key={menuItem.id}
            style={{ textDecoration: "none", color: "black" }}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>{menuItem.icon}</ListItemIcon>
                <ListItemText primary={menuItem.label} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => {
                if (accessToken) {
                  setOpen(true);
                }
              }}
            >
              <MenuIcon />
            </IconButton>
            <Box>
              {accessToken
                ? sidebarMenuItems.map(
                    (menuItem) =>
                      window.location.pathname === menuItem.route && (
                        <Typography
                          variant="h4"
                          component="div"
                          key={menuItem.id}
                        >
                          <ListItemText primary={menuItem.label} />
                        </Typography>
                      )
                  )
                : ""}
            </Box>
          </Box>
          <Box>
            {accessToken ? (
              <Typography variant="h5" component="div">
                {navBarTitle}
              </Typography>
            ) : (
              <Typography variant="h5" component="div">
                You Neeed To Login First
              </Typography>
            )}
          </Box>
          {accessToken ? (
            <Typography
              variant="h6"
              component="div"
              sx={{ cursor: "pointer", userSelect: "none" }}
              onClick={() => {
                localStorage.removeItem("accessToken");
                navigate("/logout");
              }}
            >
              {window.location.pathname === "/login"
                ? "Create New Account"
                : "Logout"}
            </Typography>
          ) : (
            <Typography
              variant="h6"
              component="div"
              sx={{ cursor: "pointer", userSelect: "none" }}
              onClick={() => {
                localStorage.removeItem("accessToken");
                if (window.location.pathname === "/login") {
                  navigate("/register");
                } else {
                  navigate("/login");
                }
              }}
            >
              {window.location.pathname === "/login"
                ? "Create New Account"
                : "LogIn"}
            </Typography>
          )}
        </Toolbar>
      </AppBar>

      <Drawer open={open} onClose={() => setOpen(false)}>
        {renderDreawer()}
      </Drawer>
    </Box>
  );
};
export default NavBar;
