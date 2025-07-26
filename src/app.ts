import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "@swagger";
import { ENV } from "@config/env";
import { logger } from "@config/logger";
import { errorHandler } from "@middlewares/error.handler";
import { corsOptions } from "@utils/cors";
import { limiter } from "@utils/limiter";
import authRoutes from "@modules/auth/auth.routes";
import passwordRoutes from "@modules/password/password.routes";

const app = express();

app.use(cors(corsOptions));
app.use(limiter);
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(logger);

/**
 * @route GET /
 * @desc Welcome to API
 */
app.get("/", (req, res) => res.json({ message: `Welcome to ${ENV.APP_NAME}` }));

/**
 * @route /api/
 * @desc Main API
 */
app.use("/api/auth", authRoutes);
app.use("/api/password", passwordRoutes);

/**
 * @route /api/docs
 * @desc Swagger Documentation
 */
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @route *
 * @desc 404 Not Found
 */
app.use((_req, res) => {
    res.status(404).json({ message: "Route not found" });
});

/**
 * @desc Global Error Handler
 */
app.use(errorHandler);

export default app;
