import * as express from "express";
import controller from "../controllers/auth";
import authMiddleware from "../middlewares/jwt";

const router = express.Router();

router.post("/token", controller.getToken);
router.get(
  "/token/refresh",
  [
    // FIXME authMiddleware.DEFAULT_AUTH_MIDDLEWARE,
    authMiddleware.verifyRefreshToken,
  ],
  controller.refreshToken
);

export default router;
