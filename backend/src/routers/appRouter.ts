import express, { Request, Response } from "express";
import { db } from "../db/db";
import { checkAuth } from "../utils/auth";
import { fileUpload } from "../utils/fileUpload";
export const appRouter = express.Router();

appRouter.get("/", checkAuth, async (req: Request, res: Response) => {
  const userResult = await db.query(`select * from users where email = $1`, [
    //@ts-ignore
    req.email,
  ]);

  const userRows = userResult.rows;
  if (!userRows.length) return res.sendStatus(401);

  const user = userResult.rows[0];
  const companyId = user.companies_id;

  const locations = await db.query(
    "select * from locations where companies_id = $1 and is_archived = false",
    [companyId]
  );
  const locationIds = locations.rows.map((row) => row.id);
  const menuMenuCategoriesLocations = await db.query(
    "select * from menus_menu_categories_locations where locations_id = ANY($1::int[])  AND is_archived = $2",
    [locationIds, false]
  );

  const tablesResult = await db.query(
    `
  select * from tables where locations_id = ANY($1::int[]) and is_archived = false`,
    [locationIds]
  );

  const menuIds = menuMenuCategoriesLocations.rows.map((row) => row.menus_id);

  const menus = await db.query(
    `select * from menus where is_archived = false and id = ANY($1::int[])`,
    [menuIds]
  );
  /*  const menuMenuCategoriesResult = await db.query(
    "select * from menus_menu_categories where menus_id = ANY($1::int[])",
    [menuIds]
  ); */
  const menuCategoryIds = menuMenuCategoriesLocations.rows.map(
    (row) => row.menu_categories_id
  );
  const menuCategoriesResult = await db.query(
    "select * from menu_categories where id = ANY($1::int[])",
    [menuCategoryIds]
  );
  const menusAddonCategoriesResult = await db.query(
    "select * from menus_addon_categories where menus_id = ANY($1::int[])",
    [menuIds]
  );
  const addonCategoryIds = menusAddonCategoriesResult.rows.map(
    (row) => row.addon_categories_id
  );
  const addonCategories = await db.query(
    "select * from addon_categories where id = ANY($1::int[]) and is_archived = false",
    [addonCategoryIds]
  );
  const addons = await db.query(
    "select * from addons where addon_categories_id = ANY($1::int[]) and is_archived = false",
    [addonCategoryIds]
  );
  const companyResult = await db.query(
    "select * from companies where id = $1",
    [companyId]
  );
  const company = companyResult.rows[0];
  res.send({
    menus: menus.rows,
    menuCategories: menuCategoriesResult.rows,
    addons: addons.rows,
    addonCategories: addonCategories.rows,
    menusAddonCategories: menusAddonCategoriesResult.rows,
    locations: locations.rows,
    tables: tablesResult.rows,
    menuMenuCategoriesLocations: menuMenuCategoriesLocations.rows,
    company,
  });
});

appRouter.post("/assets", (req: Request, res: Response) => {
  try {
    fileUpload(req, res, async (error) => {
      if (error) {
        return res.sendStatus(500);
      }

      const files = req.files as Express.MulterS3.File[];

      const file = files[0];
      const assetUrl = file.location;
      res.send({ assetUrl });
    });
  } catch (err) {
    console.log("this is error...", err);
    res.sendStatus(500);
  }
});
/* appRouter.post("/assets", (req: Request, res: Response) => {
  try {
    fileUpload(req, res, async (error) => {
      if (error) {
        return res.sendStatus(500);
      }
      const files = req.files as Express.MulterS3.File[];

      const file = files[0];
      const assetUrl = file.location;
      res.send({ assetUrl });
    });
  } catch (err) {
    console.log("This is errr....", err);
    res.sendStatus(500);
  }
}); */
export default appRouter;
