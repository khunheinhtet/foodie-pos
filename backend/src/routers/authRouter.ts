import bcrypt from "bcrypt";
import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { db } from "../db/db";
const authRouter = express.Router();

authRouter.post("/login", async (req: Request, res: Response) => {
  const JWT_SECRET = process.env.JWT_SECRET as string;
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
    const accessToken = jwt.sign(user, JWT_SECRET);

    return res.send({ accessToken });
  }
  return res.sendStatus(401);
});
authRouter.post("/register", async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const isValid =
    name &&
    name.length > 0 &&
    email &&
    email.length > 0 &&
    password &&
    password.length > 0;
  if (!isValid) return res.send({ error: "Name and Password are required." });
  try {
    const result = await db.query("select * from users where email = $1", [
      email,
    ]);
    if (result.rows.length)
      return res.send({ message: "User already exists." });

    const companiesResult = await db.query(
      "insert into companies (name) values ($1) returning *",
      ["Default Companies"]
    );
    const companyId = companiesResult.rows[0].id;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.query(
      "insert into users (name, email, password, companies_id) values($1, $2, $3, $4) returning *",
      [name, email, hashedPassword, companyId]
    );

    const locationResult = await db.query(
      "insert into locations (name, address, companies_id) values($1, $2, $3) returning *",
      ["Default location", "Default address", companyId]
    );
    const locationId = locationResult.rows[0].id;

    const menusResult = await db.query(
      "insert into menus(name, prices) select * from unnest($1::text[], $2::int[]) returning *",
      [
        ["mote-hinn-khar", "shan-khout-swell"],
        [500, 1000],
      ]
    );
    const menus = menusResult.rows;
    const defaultMenuId1 = menus[0].id;
    const defaultMenuId2 = menus[1].id;

    const menuCategoriesResult = await db.query(
      "insert into menu_categories (name) values ('defaultMenuId1'), ('defaultMenuId2') returning *"
    );
    const defaultMenuCategories = menuCategoriesResult.rows;
    const defaultMenuCategoryId1 = defaultMenuCategories[0].id;
    const defaultMenuCategoryId2 = defaultMenuCategories[1].id;
    await db.query(
      `insert into menus_menu_categories_locations(menus_id, menu_categories_id, locations_id) values (${defaultMenuId1}, ${defaultMenuCategoryId1}, ${locationId}), (${defaultMenuId2}, ${defaultMenuCategoryId2}, ${locationId})`
    );
    const defaultAddonCategoriesResult = await db.query(
      "insert into addon_categories(name, is_required) values ('Drinks', true), ('Size', true) returning *"
    );
    const defaultAddonCategoryId1 = defaultAddonCategoriesResult.rows[0].id;
    const defaultAddonCategoryId2 = defaultAddonCategoriesResult.rows[1].id;
    await db.query(
      `insert into menus_addon_categories(menus_id, addon_categories_id) values(${defaultMenuId1}, ${defaultAddonCategoryId1}), (${defaultMenuId2}, ${defaultAddonCategoryId2})`
    );

    await db.query(
      `insert into addons (name, price, addon_categories_id) values('Colo', 50, ${defaultAddonCategoryId1}), ('Pepsi', 50, ${defaultAddonCategoryId1}), ('Large', 30, ${defaultAddonCategoryId2}), ('Normal', 0, ${defaultAddonCategoryId2})`
    );
    res.send(newUser.rows);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});
export default authRouter;
