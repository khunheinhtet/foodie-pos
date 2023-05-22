import { NextFunction, Request, Response } from "express";
import Jwt from "jsonwebtoken";
import { config } from "../config/config";

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  const headers = req.headers;
  const authorization = headers.authorization;
  if (!authorization) return res.sendStatus(401);
  try {
    const token = authorization.split(" ")[1];
    Jwt.verify(token, config.jwtSecret);
    next();
  } catch (err) {
    res.sendStatus(401);
  }
};
