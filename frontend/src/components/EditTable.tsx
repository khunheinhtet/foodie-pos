import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { config } from "../config/config";
import { AppContext } from "../contexts/AppContext";
import { Table } from "../typings/types";
import { getAccessToken } from "../utils";
import DeleteDialog from "./DeleteDialog";
import Layout from "./Layout";

const EditeTable = () => {
  const params = useParams();
  const tableId = params.id as string;
  const accessToken = getAccessToken();
  const { tables, fetchData } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [table, setTable] = useState<Table>();
  const navigate = useNavigate();
  useEffect(() => {
    if (tables.length) {
      const validTable = tables.find((item) => item.id === Number(tableId));
      setTable(validTable);
    }
  }, [tables]);
  const updateTable = async () => {
    if (!table?.name) return;
    await fetch(`${config.apiBaseUrl}/tables/${tableId}`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${accessToken}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(table),
    });
    accessToken && fetchData(accessToken);
  };
  const handleDeleteTable = async () => {
    await fetch(`${config.apiBaseUrl}/tables/${tableId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    accessToken && fetchData(accessToken);
    navigate("/tables");
  };
  if (!table) return null;
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
          defaultValue={table.name}
          onChange={(evt) => setTable({ ...table, name: evt.target.value })}
        ></TextField>

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            onClick={updateTable}
            sx={{ width: "fit-content", mt: 2 }}
          >
            Update
          </Button>
        </Box>
        <DeleteDialog
          title="Are you sure to delete this addon Category?"
          open={open}
          setOpen={setOpen}
          callback={handleDeleteTable}
        />
      </Box>
    </Layout>
  );
};
export default EditeTable;
