import { Request, Response, NextFunction } from "express";
import authService from "./auth.service";
import { setAuthCookies } from "@utils/cookie";

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password } = req.body;
        const user = await authService.register(name, email, password);
        res.status(201).json({ message: "User registered" });
    } catch (err) {
        next(err);
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const { accessToken, refreshToken, user } = await authService.login(req, email, password);
        setAuthCookies(res, accessToken, refreshToken);
        res.json({ message: "Login successful", accessToken });
    } catch (err) {
        next(err);
    }
};

export const refresh = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const refreshToken = req.cookies.refresh_token || req.body.refreshToken;
        const { accessToken } = await authService.refreshToken(refreshToken);
        res.cookie("access_token", accessToken, { httpOnly: true });
        res.json({ accessToken });
    } catch (err) {
        next(err);
    }
};

export const me = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await authService.me((req as any).userId);
        res.json(user);
    } catch (err) {
        next(err);
    }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const refreshToken = req.cookies.refresh_token || req.body.refreshToken;
        await authService.logout(refreshToken);
        res.clearCookie("access_token");
        res.clearCookie("refresh_token");
        res.json({ message: "Logged out successfully" });
    } catch (err) {
        next(err);
    }
};

export const verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { token } = req.query;
        const result = await authService.verifyEmail(token as string);
        res.json(result);
    } catch (err) {
        next(err);
    }
};
