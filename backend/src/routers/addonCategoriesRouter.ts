import express, { Request, Response } from "express";
import { db } from "../db/db";
import { checkAuth } from "../utils/auth";
const addonCategoriesRouter = express.Router();
addonCategoriesRouter.post(
  "",
  checkAuth,
  async (req: Request, res: Response) => {
    const { name, is_required, menuIds } = req.body;
    const isValid = name && menuIds.length;
    if (!isValid) return res.send(400);
    const newAddonCategory = await db.query(
      "insert into addon_categories (name,  is_required) values ($1, $2) returning *",
      [name, is_required]
    );
    const newAddonCategoryId = newAddonCategory.rows[0].id;

    menuIds.forEach(async (item: number) => {
      await db.query(
        "insert into menus_addon_categories (menus_id, addon_categories_id) values($1, $2)",
        [item, newAddonCategoryId]
      );
    });

    res.send(200);
  }
);
addonCategoriesRouter.put(
  "/:id",
  checkAuth,
  async (req: Request, res: Response) => {
    const addonCategoryId = req.params.id;

    const isValid = addonCategoryId && req.body.name;
    if (!isValid) return res.send(400);
    const existingAddonCategories = await db.query(
      "select * from addon_categories where id = $1",
      [addonCategoryId]
    );
    const hasExistingAddon = existingAddonCategories.rows.length;
    if (!hasExistingAddon) return res.send(400);

    await db.query("update addon_categories set name = $1  where id = $2", [
      req.body.name,

      addonCategoryId,
    ]);
    res.send(200);
  }
);
addonCategoriesRouter.delete(
  "/:id",
  checkAuth,
  async (req: Request, res: Response) => {
    const addonCategoryId = req.params.id;

    const isValid = addonCategoryId;
    if (!isValid) return res.send(400);
    const existingAddonCategories = await db.query(
      "select * from addon_categories where id = $1",
      [addonCategoryId]
    );
    const hasExistingAddon = existingAddonCategories.rows.length;
    if (!hasExistingAddon) return res.send(400);

    await db.query(
      "update addon_categories set is_archived = true  where id = $1",
      [addonCategoryId]
    );
    res.send(200);
  }
);

export default addonCategoriesRouter;
