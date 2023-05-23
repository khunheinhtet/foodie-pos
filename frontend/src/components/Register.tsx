import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useState } from "react";
import Layout from "./Layout";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const register = async () => {
    const response = await fetch("http://localhost:5000/auth/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (response.ok) {
      const responseData = await response.json();

      console.log(responseData);
      navigate("/");
      return;
    }
  };
  return (
    <Layout>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          mt: 2,
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          label="Name"
          variant="outlined"
          sx={{ minWidth: "400px" }}
          onChange={(evt) => {
            setUser({ ...user, name: evt.target.value });
          }}
        />
        <TextField
          label="Email"
          variant="outlined"
          sx={{ minWidth: "400px" }}
          onChange={(evt) => {
            setUser({ ...user, email: evt.target.value });
          }}
        />
        <TextField
          type="password"
          label="Password"
          variant="outlined"
          sx={{ minWidth: "400px" }}
          onChange={(evt) => {
            setUser({ ...user, password: evt.target.value });
          }}
        />
        <Button variant="contained" onClick={register}>
          Register
        </Button>
      </Box>
    </Layout>
  );
};
export default Register;
