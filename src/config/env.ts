import { config } from "dotenv";
config();

export const ENV = {
    APP_NAME: process.env.APP_NAME || "Express TypeScript Starter",
    PORT: process.env.PORT || 5000,
    ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS || "*",
    DATABASE_URL: process.env.DATABASE_URL!,
    EMAIL_HOST: process.env.EMAIL_HOST!,
    EMAIL_PORT: process.env.EMAIL_PORT!,
    EMAIL_USER: process.env.EMAIL_USER!,
    EMAIL_PASS: process.env.EMAIL_PASS!,
    JWT_SECRET: process.env.JWT_SECRET!,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET!,
    NODE_ENV: process.env.NODE_ENV || "development",
};
