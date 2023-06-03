import http from "http";
import express, { Express } from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth";
import testRoutes from "./routes/test";
import { errorHandler } from "./middlewares/errors";

const router: Express = express();

router.use(morgan("dev"));
router.use(express.urlencoded({ extended: false }));
router.use(express.json());
router.use(cors());
router.use(helmet());
router.use(cookieParser());

router.use("/api/auth", authRoutes);
router.use("/api/test", testRoutes);
router.use(errorHandler);

const PORT: any = process.env.PORT ?? 3000;
http
  .createServer(router)
  .listen(PORT, () => console.log(`Mock server is running on port ${PORT}`));
