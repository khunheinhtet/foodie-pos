import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useState } from "react";
import Layout from "./Layout";

const Register = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const register = async () => {
    const response = await fetch("http://localhost:5000/auth/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    });
    console.log(await response.json());
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
          onChange={(evt) => {
            setUser({ ...user, name: evt.target.value });
          }}
        />
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
        <Button variant="contained" onClick={register}>
          Register
        </Button>
      </Box>
    </Layout>
  );
};
export default Register;
