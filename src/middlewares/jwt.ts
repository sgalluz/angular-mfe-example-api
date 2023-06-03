import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config";
import { REFRESH_TOKEN_NAME } from "../models/token";

const validateJwt = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.header("authorization");
  if (!authHeader) {
    return _unauthorized(res, "Missing authorization header");
  }

  try {
    const token: string = authHeader?.replace("Bearer ", "");
    res.locals.jwtPayload = jwt.verify(token, config.jwtSecret);
  } catch (error) {
    return _unauthorized(res, "Invalid or expired jwt token");
  }

  next();
};

const verifyRefreshToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cookieToken = req.cookies?.[REFRESH_TOKEN_NAME];
  if (!cookieToken) {
    return _unauthorized(res, "Missing refresh token");
  }

  try {
    jwt.verify(cookieToken, config.jwtRefreshSecret) as string;
  } catch (error) {
    return _unauthorized(res, "Invalid or expired refresh token");
  }

  next();
};

const _unauthorized = (res: Response, message = "Unauthorized") =>
  res.status(401).send({ status: 401, message });

export default {
  DEFAULT_AUTH_MIDDLEWARE: validateJwt,
  verifyRefreshToken,
};
