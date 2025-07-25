import { Response } from "express";
import { ENV } from "@config/env";

export const setAuthCookies = (
    res: Response,
    accessToken: string,
    refreshToken: string
) => {
    res.cookie("access_token", accessToken, {
        httpOnly: true,
        secure: ENV.NODE_ENV === "production",
        maxAge: 15 * 60 * 1000,
        sameSite: "lax",
    });
    res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        secure: ENV.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: "lax",
    });
};

export const clearAuthCookies = (res: Response) => {
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
};