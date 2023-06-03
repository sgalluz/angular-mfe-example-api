import * as express from "express";
import authMiddleware from "../middlewares/jwt";
import { Request, Response } from "express";

const router = express.Router();

router.get(
  "",
  [authMiddleware.DEFAULT_AUTH_MIDDLEWARE],
  (req: Request, res: Response) => res.json({ foo: "bar" })
);

router.get(
  "/two",
  [authMiddleware.DEFAULT_AUTH_MIDDLEWARE],
  (req: Request, res: Response) => res.json({ foo2: "bar2" })
);

export default router;
