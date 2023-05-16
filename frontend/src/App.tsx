import React, { useEffect } from "react";
import "./App.css";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Layout from "./components/Layout";

function App() {
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const response = await fetch("http://localhost:5000/menus");
    console.log(await response.json());
  };
  return (
    <Layout>
      <div className="App">
        <Box sx={{ mt: 5 }}>
          <Typography variant="h3">Welcome to Foodie POS</Typography>
        </Box>
      </div>
    </Layout>
  );
}

export default App;
