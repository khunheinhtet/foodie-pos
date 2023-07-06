import express, { Request, Response } from "express";
import { db } from "../db/db";
const tableRouter = express.Router();

tableRouter.post("/", async (req: Request, res: Response) => {
  const { name, locationId } = req.body;
  const isValid = name && locationId;

  if (!isValid) return res.send(400);
  await db.query("insert into tables (name, locations_id) values($1, $2)", [
    name,
    locationId,
  ]);
});
tableRouter.put("/:id", async (req: Request, res: Response) => {
  const tableId = req.params.id;
  const { name, locations_id } = req.body;
  const isValid = name && tableId && locations_id;
  if (!isValid) return res.send(400);
  const hasExistingTable = await db.query(
    "select * from tables where id = $1",
    [tableId]
  );
  const isExit = hasExistingTable.rows.length;
  if (!isExit) return res.send(400);
  await db.query(
    "update tables set name = $1 where locations_id= $2 and id = $3",
    [name, locations_id, tableId]
  );
  res.send(200);
});
tableRouter.delete("/:id", async (req: Request, res: Response) => {
  const tableId = req.params.id;

  const isValid = tableId;
  if (!isValid) return res.send(400);
  const hasExistingTable = await db.query(
    "select * from tables where id = $1",
    [tableId]
  );
  const isExit = hasExistingTable.rows.length;
  if (!isExit) return res.send(400);
  await db.query("update tables set is_archived = true where id = $1", [
    tableId,
  ]);
  res.send(200);
});
export default tableRouter;
