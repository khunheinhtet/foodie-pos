import express, { Request, Response } from "express";
import { db } from "../db/db";
import { checkAuth } from "../utils/auth";
const menusRouter = express.Router();

menusRouter.get("/menus", checkAuth, async (req: Request, res: Response) => {
  const menusResult = await db.query("select * from menus");

  res.send(menusResult.rows);
});

menusRouter.post("/", checkAuth, async (req: Request, res: Response) => {
  const { name, description, price, assetUrl, locationId, menuCategoryIds } =
    req.body;
  const newMenusResult = await db.query(
    "insert into menus (name, description, prices, asset_url) values($1, $2, $3, $4) returning *",
    [name, description, price, assetUrl]
  );
  const menuId = newMenusResult.rows[0].id;
  menuCategoryIds.forEach(async (item: number) => {
    await db.query(
      "insert into menus_menu_categories_locations (menus_id, menu_categories_id, locations_id) values ($1, $2, $3)",
      [menuId, item, locationId]
    );
  });
  res.send(newMenusResult.rows);
});
menusRouter.put("/", checkAuth, async (req: Request, res: Response) => {
  try {
    const { id, name, prices, addonCategoryIds } = req.body;
    const isValid = name && id;
    if (!isValid) return res.send(400);
    await db.query("update menus set name = $1, prices = $2 returning *", [
      name,
      prices,
    ]);
    const existingAddonCategoryIds = await db.query(
      "select addon_categories_id from menus_addon_categories where menus_id = $1",
      [id]
    );

    console.log("existingAddonCategoryIds..", existingAddonCategoryIds.rows);
    console.log("addonCategoryIds..", addonCategoryIds);
    const removedAddonCategoryIds = existingAddonCategoryIds.rows.filter(
      (item) => addonCategoryIds.includes(item.addon_categories_id)
    );
    if (removedAddonCategoryIds.length) {
      removedAddonCategoryIds.forEach(
        async (item) =>
          await db.query(
            "delete from menus_addon_categories where menus_id = $1 and addon_categories_id = $2",
            [id, item.addon_categories_id]
          )
      );
    }
    const addedAddonCategoryIds = addonCategoryIds.filter(
      (item: number) => !existingAddonCategoryIds.rows.includes(item)
    );
    if (addedAddonCategoryIds) {
      addedAddonCategoryIds.forEach(
        async (item: number) =>
          await db.query(
            "insert into menus_addon_categories(menus_id, addon_categories_id) values ($1, $2)",
            [id, item]
          )
      );
    }
  } catch (error) {
    console.log(error);
    res.send(req.body);
  }
});
menusRouter.delete(
  "/:menuId",
  checkAuth,
  async (req: Request, res: Response) => {
    const menuId = req.params.menuId;
    if (!menuId) return res.send(400);
    await db.query("update menus set is_archived = true where id=$1", [menuId]);
    res.send(200);
  }
);
export default menusRouter;
