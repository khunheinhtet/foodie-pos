import express, { Request, Response } from "express";
import { checkAuth } from "../utils/auth";
import { db } from "../db/db";
const menusRouter = express.Router();

menusRouter.get("/menus", checkAuth, async (req: Request, res: Response) => {
  console.log("menusRouter.....");
  const menusResult = await db.query("select * from menus");
  console.log(menusResult);
  res.send(menusResult.rows);
});
export default menusRouter;
