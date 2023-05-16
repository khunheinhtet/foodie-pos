import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: "", password: "" });
  const login = async () => {
    const response = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (response.ok) {
      const responseData = await response.json();
      console.log(responseData);
      const accessToken = responseData.accessToken;
      localStorage.setItem("accessToken", accessToken);
      navigate("/");
    }
  };
  return (
    <Layout>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 2,
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          label="Email"
          variant="outlined"
          onChange={(evt) => {
            setUser({ ...user, email: evt.target.value });
          }}
        />
        <TextField
          type="password"
          label="Password"
          variant="outlined"
          onChange={(evt) => {
            setUser({ ...user, password: evt.target.value });
          }}
        />
        <Button variant="contained" onClick={login}>
          Login
        </Button>
      </Box>
    </Layout>
  );
};
export default Login;
