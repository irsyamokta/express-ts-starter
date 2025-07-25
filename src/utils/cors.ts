import { CorsOptions } from "cors";
import { ENV } from "@config/env";

const rawOrigins = ENV.ALLOWED_ORIGINS;
const allowedOrigins = rawOrigins.split(",").map(origin => origin.trim());

export const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200,
};
