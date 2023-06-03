import React, { useEffect } from "react";
import "./App.css";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Layout from "./components/Layout";

function App() {
  console.log("this is App.tsx.....");
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
