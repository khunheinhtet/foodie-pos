import { NextFunction, Request, Response } from "express";
import Jwt from "jsonwebtoken";
import { config } from "../config/config";

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  const headers = req.headers;

  const authorization = headers.authorization;
  if (!authorization) return res.sendStatus(401);
  try {
    const accessToken = authorization.split(" ")[1];

    const user = Jwt.verify(accessToken, config.jwtSecret);

    //@ts-ignore
    req["email"] = user.email;

    next();
  } catch (err) {
    res.sendStatus(401);
  }
};
