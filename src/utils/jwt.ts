import jwt from "jsonwebtoken";
import { ENV } from "@config/env";

export const generateAccessToken = (userId: string, role: string) =>
    jwt.sign({ userId, role }, ENV.JWT_SECRET, { expiresIn: "15m" });

export const generateRefreshToken = (userId: string, role: string) =>
    jwt.sign({ userId, role }, ENV.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });

export const verifyAccessToken = (token: string) =>
    jwt.verify(token, ENV.JWT_SECRET) as { userId: string, role: string };

export const verifyRefreshToken = (token: string) =>
    jwt.verify(token, ENV.JWT_SECRET) as { userId: string, role: string };
