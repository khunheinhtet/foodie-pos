import express, { Request, Response } from "express";
import { db } from "../db/db";
import { checkAuth } from "../utils/auth";
const locationsRouter = express.Router();
locationsRouter.post("/", checkAuth, async (req: Request, res: Response) => {
  const { name, address, companyId } = req.body;

  const isValid = name && address && companyId;

  if (!isValid) return res.send(400);
  await db.query(
    "insert into locations (name, address, companies_id) values($1, $2, $3)",
    [name, address, companyId]
  );
  res.send(200);
});
locationsRouter.put("/:id", checkAuth, async (req: Request, res: Response) => {
  const { name, address } = req.body;
  const locationId = req.params.id;
  console.log(name, address, locationId);
  if (!name && !address && !locationId) return res.send(400);
  await db.query("update locations set name = $1, address = $2 where id = $3", [
    name,
    address,
    locationId,
  ]);
  res.sendStatus(200);
});
locationsRouter.delete(
  "/:id",
  checkAuth,
  async (req: Request, res: Response) => {
    const locationId = req.params.id;
    if (!locationId) return res.send(400);
    await db.query("update locations set is_archived = true where id =  $1", [
      locationId,
    ]);
    res.send(200);
  }
);

export default locationsRouter;
