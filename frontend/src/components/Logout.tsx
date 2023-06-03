import { Typography } from "@mui/material";
import Layout from "./Layout";

const Logout = () => {
  return (
    <Layout title="Logout">
      <Typography variant="h4" sx={{ textAlign: "center", mt: 5 }}>
        You are now logged out.
      </Typography>
    </Layout>
  );
};

export default Logout;
