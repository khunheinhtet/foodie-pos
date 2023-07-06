import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { config } from "../config/config";
import { AppContext } from "../contexts/AppContext";
import { Addon } from "../typings/types";
import { getAccessToken } from "../utils";
import DeleteDialog from "./DeleteDialog";
import Layout from "./Layout";

const EditAddons = () => {
  const params = useParams();
  const addonId = params.id as string;
  const accessToken = getAccessToken();
  const { addons, fetchData } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [addon, setAddon] = useState<Addon>();
  const navigate = useNavigate();
  useEffect(() => {
    if (addons.length) {
      const validAddon = addons.find((item) => item.id === Number(addonId));
      setAddon(validAddon);
    }
  }, [addons]);
  const updateAddon = async () => {
    if (!addon?.name) return;
    await fetch(`${config.apiBaseUrl}/addons/${addonId}`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${accessToken}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(addon),
    });
    accessToken && fetchData(accessToken);
  };
  const handleDeleteAddon = async () => {
    await fetch(`${config.apiBaseUrl}/addons/${addonId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    accessToken && fetchData(accessToken);
    navigate("/Addons");
  };
  if (!addon) return null;
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
          defaultValue={addon.name}
          onChange={(evt) => setAddon({ ...addon, name: evt.target.value })}
        ></TextField>
        <TextField
          type="number"
          defaultValue={addon.price}
          onChange={(evt) =>
            setAddon({ ...addon, price: Number(evt.target.value) })
          }
        ></TextField>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            onClick={updateAddon}
            sx={{ width: "fit-content", mt: 2 }}
          >
            Update
          </Button>
        </Box>
        <DeleteDialog
          title="Are you sure to delete this addon Category?"
          open={open}
          setOpen={setOpen}
          callback={handleDeleteAddon}
        />
      </Box>
    </Layout>
  );
};
export default EditAddons;
