import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
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

      const accessToken = responseData.accessToken;
      localStorage.setItem("accessToken", accessToken);

      navigate("/");
    }
  };
  return (
    <Layout title="Login">
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "500px",
          margin: "0 auto",
          mt: 2,
        }}
        noValidate
        autoComplete="off"
      >
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
          sx={{ my: 2, minWidth: "400px" }}
          onChange={(evt) => {
            setUser({ ...user, password: evt.target.value });
          }}
        />
        <Button variant="contained" onClick={login} sx={{ minWidth: "200px" }}>
          Login
        </Button>
      </Box>
    </Layout>
  );
};
export default Login;
