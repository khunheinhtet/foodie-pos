import cors from "cors";
import express from "express";
import addonCategoriesRouter from "./src/routers/addonCategoriesRouter";
import addonsRouter from "./src/routers/addonsRouter";
import appRouter from "./src/routers/appRouter";
import authRouter from "./src/routers/authRouter";
import locationsRouter from "./src/routers/locationsRouter";
import { menuCategoriesRouter } from "./src/routers/menuCategoriesRouter";
import menusRouter from "./src/routers/menusRouter";
import tableRouter from "./src/routers/tableRouter";

const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());

app.use("/", appRouter);
app.use("/auth", authRouter);
app.use("/menus", menusRouter);
app.use("/locations", locationsRouter);
app.use("/tables", tableRouter);
app.use("/menuCategories", menuCategoriesRouter);
app.use("/addonCategories", addonCategoriesRouter);
app.use("/addons", addonsRouter);

/* app.post("/auth/register", async (req: Request, res: Response) => {
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
    await db.query(
      "insert into menus_locations(menus_id, locations_id) select * from unnest ($1::int[], $2::int[])",
      [
        [defaultMenuId1, defaultMenuId2],
        [locationId, locationId],
      ]
    );

    const menuCategoriesResult = await db.query(
      "insert into menu_categories (name) values ('defaultMenuId1'), ('defaultMenuId2') returning *"
    );
    const defaultMenuCategories = menuCategoriesResult.rows;
    const defaultMenuCategoryId1 = defaultMenuCategories[0].id;
    const defaultMenuCategoryId2 = defaultMenuCategories[1].id;

    await db.query(
      `insert into menus_menu_categories(menus_id, menu_categories_id) values(${defaultMenuId1}, ${defaultMenuCategoryId1}), (${defaultMenuId2}, ${defaultMenuCategoryId2})`
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

app.get("/menu_categories", async (req: Request, res: Response) => {
  const menuCategories = await db.query("select * from menu_categories");

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
 */
app.listen(port, () => {
  console.log("server is linsten on port", port);
});
