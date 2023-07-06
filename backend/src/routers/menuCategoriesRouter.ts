import express, { Request, Response } from "express";
import { db } from "../db/db";
import { checkAuth } from "../utils/auth";
export const menuCategoriesRouter = express.Router();

menuCategoriesRouter.put(
  "/",
  checkAuth,
  async (req: Request, res: Response) => {
    const { id, name, locationIds } = req.body;

    if (!id) res.send(400);
    if (name) {
      await db.query("update menu_categories set name = $1 where id = $2", [
        name,
        id,
      ]);
    }
    const existingLocationsResultRow = await db.query(
      "select locations_id from menus_menu_categories_locations where menu_categories_id = $1",
      [id]
    );

    const existingLocationIds = existingLocationsResultRow.rows.map(
      (item) => item.locations_id
    );

    const removedLocationIds = existingLocationIds.filter(
      (item) => !locationIds.includes(item)
    );

    if (removedLocationIds.length) {
      removedLocationIds.forEach(async (item) => {
        await db.query(
          "update menus_menu_categories_locations set is_archived = true where menu_categories_id = $1 AND locations_id = $2",
          [Number(id), item]
        );
      });
    }
    const addedLocationIds = locationIds.filter(
      (item: number) => !existingLocationIds.includes(item)
    );
    res.send(200);
  }
);
menuCategoriesRouter.put(
  "/removeMenu",
  checkAuth,
  async (req: Request, res: Response) => {
    const { menuId, menuCategoryId, locationId } = req.body;
    const isValid = menuId && menuCategoryId && locationId;
    if (!isValid) return res.send(400);
    const menusMenuCategoriesLocations = await db.query(
      "select * from menus_menu_categories_locations where menus_id = $1 and menu_categories_id = $2 and locations_id = $3",
      [menuId, menuCategoryId, locationId]
    );
    const hasMenusMenuCategoriesLocations =
      menusMenuCategoriesLocations.rows.length;
    if (!hasMenusMenuCategoriesLocations) return res.send(400);
    await db.query(
      "update menus_menu_categories_locations set is_archived = true where menus_id = $1 and menu_categories_id = $2 and locations_id = $3",
      [menuId, menuCategoryId, locationId]
    );
    res.send(200);
  }
);
menuCategoriesRouter.put(
  "/addMenu",
  checkAuth,
  async (req: Request, res: Response) => {
    const { menuIds, menuCategoryId, locationIds } = req.body;
    const isValid = menuCategoryId && menuIds.length & locationIds.length;
    if (!isValid) return res.send(400);
    menuIds.forEach((menuId: number) => {
      locationIds.forEach(async (item: number) => {
        const menuMenuCategoriesLocations = await db.query(
          "select * from menus_menu_categories_locations where menus_id = $1 and menu_categories_id=$2 and locations_id =$3",
          [menuId, menuCategoryId, item]
        );
        const isExit = menuMenuCategoriesLocations.rows.length;
        if (isExit) {
          await db.query(
            "update menus_menu_categories_locations set is_archived = false where menus_id = $1 and menu_categories_id=$2 and locations_id =$3",
            [menuId, menuCategoryId, item]
          );
        } else {
          await db.query(
            "insert into menus_menu_categories_locations (menus_id, menu_categories_id, locations_id) values($1, $2, $3)",
            [menuId, menuCategoryId, item]
          );
        }
      });
    });
    res.send(200);
  }
);
menuCategoriesRouter.delete(
  "/:id",
  checkAuth,
  async (req: Request, res: Response) => {
    const isValid = req.params.id && req.body.locationId;
    if (!isValid) return res.send(400);
    const menuCategoryId = req.params.id as string;
    const locationId = req.body.locationId as string;

    const menusMenuCategoriesLocations = await db.query(
      `select * from menus_menu_categories_locations where menu_categories_id = $1 and locations_id = $2`,
      [menuCategoryId, locationId]
    );
    const hasMenusMenuCategoriesLocations =
      menusMenuCategoriesLocations.rows.length;
    if (!hasMenusMenuCategoriesLocations) return res.send(400);
    menusMenuCategoriesLocations.rows.forEach(async (item) => {
      const menusMenuCategoriesLocationsId = item.id;
      await db.query(
        "update menus_menu_categories_locations set is_archived = true where id = $1 ",
        [menusMenuCategoriesLocationsId]
      );
    });
    res.send(200);
  }
);
export default menuCategoriesRouter;
