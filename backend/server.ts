import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import cors from "cors";
import { db } from "./src/db/db";
import bcrypt, { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "./src/config/config";
import { checkAuth } from "./src/utils/auth";

const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());

app.post("/auth/register", async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.sendStatus(400);
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const text =
      "INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING *";
    const value = [name, email, hashedPassword];
    const result = await db.query(text, value);
    const userinfo = result.rows[0];
    delete userinfo.password;
    res.send({ name: "Created New Users and You Can LogIn With This.." });
  } catch (err) {
    res.sendStatus(500);
  }
});

app.get("/menu_categories", async (req: Request, res: Response) => {
  console.log("in menu_categoris....");
  const menuCategories = await db.query("select * from menu_categories");
  console.log(menuCategories.rows);
  res.send(menuCategories.rows);
});

app.get("/menus", checkAuth, async (req: Request, res: Response) => {
  const menusResult = await db.query("select * from menus");
  res.send(menusResult.rows);
});

app.post("/auth/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) return res.sendStatus(400);

  const userResult = await db.query("select * from users where email = $1", [
    email,
  ]);

  if (!userResult.rows.length) res.sendStatus(401);

  const user = userResult.rows[0];
  const hashedPassword = user.password;
  delete user.password;
  const isCorrectPassword = await bcrypt.compare(password, hashedPassword);
  //return isCorrectPassword ? res.sendStatus(200) : res.sendStatus(401);
  if (isCorrectPassword) {
    const accessToken = jwt.sign(user, config.jwtSecret);

    return res.send({ accessToken });
  }
  return res.sendStatus(401);
});

app.listen(port, () => {
  console.log("server is linsten on port", port);
});
