import { CookieOptions, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config";
import { JwtPayload } from "../models/jwt-payolad";
import { REFRESH_TOKEN_AGE_IN_MS, REFRESH_TOKEN_NAME } from "../models/token";

const cookieOption: CookieOptions = {
  httpOnly: true,
  sameSite: "none",
  secure: true,
  maxAge: REFRESH_TOKEN_AGE_IN_MS,
};

const getToken = (req: Request, res: Response) => {
  const { user, password } = req.body;
  if (user !== "chewie" || password !== "chewie") {
    return res
      .status(401)
      .send({ status: 401, message: "Invalid credentials" });
  }

  try {
    // TODO fetch from db
    const jwtPayload: JwtPayload = {
      tenant_id: "123456789",
      user,
      roles: ["admin"],
      permissions: ["*"],
    };
    const jwtToken = _buildAccessToken(jwtPayload);
    const refreshToken = _buildRefreshToken({ user });
    return res
      .cookie(REFRESH_TOKEN_NAME, refreshToken, cookieOption)
      .status(200)
      .json({ jwtToken });
  } catch (error) {
    return res
      .status(401)
      .send({ status: 401, message: "Unable to create JWT token" });
  }
};

const refreshToken = (req: Request, res: Response) => {
  try {
    const token = req.cookies?.[REFRESH_TOKEN_NAME];
    const { user } = jwt.decode(token) as JwtPayload;

    // TODO fetch from db
    const jwtPayload: JwtPayload = {
      tenant_id: "123456789",
      user,
      roles: ["admin"],
      permissions: ["*"],
    };
    const jwtToken = _buildAccessToken(jwtPayload);
    return res
      .cookie(REFRESH_TOKEN_NAME, token, cookieOption)
      .status(200)
      .json({ jwtToken });
  } catch (error) {
    console.error(error);
    return res
      .status(401)
      .send({ status: 401, message: "Unable to refresh JWT token" });
  }
};

const _buildAccessToken = (jwtPayload: JwtPayload): string =>
  jwt.sign(jwtPayload, config.jwtSecret, { expiresIn: "20s" });

const _buildRefreshToken = (payload: any): string =>
  jwt.sign(payload, config.jwtRefreshSecret, { expiresIn: "10m" });

export default { getToken, refreshToken };
