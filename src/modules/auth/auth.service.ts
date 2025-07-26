import crypto from "crypto";
import bcrypt from "bcrypt";
import authRepository from "@modules/auth/auth.repository";
import { registerSchema } from "@modules/auth/auth.validator";
import { Request } from "express";
import { ENV } from "@config/env";
import { ApiError } from "@errors/ApiError";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "@utils/jwt";
import { getDeviceInfo } from "@utils/device";
import { validate } from "@utils/validator";
import { sendEmail } from "@utils/mailer";
import { renderEmailTemplate } from "@utils/template";

const register = async (name: string, email: string, password: string) => {
    validate(registerSchema, { name, email, password });

    const existingUser = await authRepository.findUserByEmail(email);
    if (existingUser) throw new ApiError(409, "Email already exists");

    const hashed = await bcrypt.hash(password, 10);
    const token = crypto.randomBytes(64).toString("hex");

    const html = renderEmailTemplate("verify-email", {
        name: name,
        verificationLink: `${ENV.CLIENT_URL}/auth/verify?token=${token}`,
        appName: ENV.APP_NAME,
    });

    await sendEmail(email, "Verify your email", html);
    return authRepository.createUser(name, email, hashed, token);
};

const login = async (req: Request, email: string, password: string) => {
    const user = await authRepository.findUserByEmail(email);
    if (!user) throw new ApiError(401, "Invalid credentials");

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new ApiError(401, "Invalid credentials");

    if (!user.isVerified) throw new ApiError(401, "Email not verified");

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    await authRepository.createSession(
        user.id,
        getDeviceInfo(req),
        req.ip ?? 'unknown',
        refreshToken,
        new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    );

    return { accessToken, refreshToken, user };
};

const refreshToken = async (refreshToken: string) => {
    const decoded = verifyRefreshToken(refreshToken);
    const session = await authRepository.findSessionByRefreshToken(refreshToken);
    if (!session) throw new Error("Invalid refresh token");
    return { accessToken: generateAccessToken(decoded.userId) };
};

const me = (userId: string) => {
    const user = authRepository.findUserById(userId);
    if (!user) throw new ApiError(401, "Unauthorized");

    return user;
};

const logout = async (refreshToken: string) => {
    await authRepository.deleteSession(refreshToken);
    return { message: "Logged out" };
};

const verifyEmail = async (token: string) => {
    const user = await authRepository.findUserByVerificationToken(token);
    if (!user) throw new ApiError(400, "Invalid or expired token");

    console.log(token);
    if (user.isVerified) throw new ApiError(400, "Email already verified");

    await authRepository.verifyEmail(user.id);

    return { message: "Email verified successfully" };
};

export default { register, login, refreshToken, me, logout, verifyEmail };
