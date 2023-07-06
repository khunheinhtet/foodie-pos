import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { config } from "../config/config";
import { AppContext } from "../contexts/AppContext";
import { AddonCategory } from "../typings/types";
import { getAccessToken } from "../utils";
import DeleteDialog from "./DeleteDialog";
import Layout from "./Layout";

const EditAddonCategory = () => {
  const params = useParams();
  const addonCategoryId = params.id as string;
  const accessToken = getAccessToken();
  const { addonCategories, fetchData } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [addonCategory, setAddonCategory] = useState<AddonCategory>();
  const navigate = useNavigate();
  useEffect(() => {
    if (addonCategories.length) {
      const validAddon = addonCategories.find(
        (item) => item.id === Number(addonCategoryId)
      );
      setAddonCategory(validAddon);
    }
  }, [addonCategories]);

  const updateAddonCategory = async () => {
    if (!addonCategory?.name) return;
    await fetch(`${config.apiBaseUrl}/addonCategories/${addonCategoryId}`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${accessToken}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(addonCategory),
    });
    accessToken && fetchData(accessToken);
  };
  const handleDeleteAddon = async () => {
    await fetch(`${config.apiBaseUrl}/addonCategories/${addonCategoryId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    accessToken && fetchData(accessToken);
    navigate("/addon-categories");
  };
  if (!addonCategory) return null;
  return (
    <Layout title="EditAddonCategories">
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
          defaultValue={addonCategory.name}
          onChange={(evt) =>
            setAddonCategory({ ...addonCategory, name: evt.target.value })
          }
        ></TextField>

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            onClick={updateAddonCategory}
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
export default EditAddonCategory;
