import { useContext } from "react";
import Layout from "./Layout";
import { AppContext } from "../contexts/AppContext";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

const Menus = () => {
  const { menus } = useContext(AppContext);
  const sampleMenuImageUrl =
    "https://msquarefdc.sgp1.cdn.digitaloceanspaces.com/Spicy%20seasoned%20seafood%20noodles.png";

  return (
    <Layout title="Menus">
      <Box sx={{ display: "flex", mt: 4, ml: 4 }}>
        {menus.map((menu, index) => {
          return (
            <Box sx={{ mr: 3 }} key={index}>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={sampleMenuImageUrl}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {menu.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ textAlign: "justify" }}
                    >
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      In rerum placeat inventore eveniet aut temporibus eaque
                      optio quidem, quasi iusto perspiciatis, beatae saepe
                      dolores, praesentium distinctio magni id? Deleniti, enim.
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Box>
          );
        })}
      </Box>
    </Layout>
  );
};

export default Menus;
