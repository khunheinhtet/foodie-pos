import { CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { Menu } from "../typings/types";
interface Props {
  menu: Menu;
}
const MenuCard = ({ menu }: Props) => {
  return (
    <Link
      to={`/menus/${menu.id}`}
      style={{
        textDecoration: "none",
        marginRight: "15px",
        marginBottom: "10px",
      }}
    >
      <Card sx={{ maxWidth: 345, mb: 2 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={menu.asset_url || ""}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {menu.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {menu.prices} kyat
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};

export default MenuCard;
