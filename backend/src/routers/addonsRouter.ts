import express, { Request, Response } from "express";
import { db } from "../db/db";
import { checkAuth } from "../utils/auth";
const addonsRouter = express.Router();
addonsRouter.post("", checkAuth, async (req: Request, res: Response) => {
  const { name, price, addonCategoryIds } = req.body;
  const isValid = name && addonCategoryIds.length;
  if (!isValid) return res.send(400);
  if (isValid) {
    addonCategoryIds.forEach(async (item: number) => {
      await db.query(
        "insert into addons (name, price, addon_categories_id) values ($1, $2, $3)",
        [name, price, item]
      );
    });
  }
  res.send(200);
});
addonsRouter.put("/:id", checkAuth, async (req: Request, res: Response) => {
  const addonId = req.params.id;

  const isValid = addonId && req.body.name;
  if (!isValid) return res.send(400);
  const existingAddon = await db.query("select * from addons where id = $1", [
    addonId,
  ]);
  const hasExistingAddon = existingAddon.rows.length;
  if (!hasExistingAddon) return res.send(400);
  const name = req.body.name;
  const existingPrice = existingAddon.rows[0].price;

  const price = req.body.price || existingPrice;
  await db.query("update addons set name = $1 , price = $2 where id = $3", [
    name,
    price,
    addonId,
  ]);
  res.send(200);
});
addonsRouter.delete("/:id", checkAuth, async (req: Request, res: Response) => {
  const addonId = req.params.id;

  if (!addonId) return res.send(400);
  const existingAddon = await db.query("select * from addons where id = $1", [
    addonId,
  ]);
  const hasExistingAddon = existingAddon.rows.length;
  if (!hasExistingAddon) return res.send(400);

  await db.query("update addons set is_archived = true where id = $1", [
    addonId,
  ]);
  res.send(200);
});
export default addonsRouter;
