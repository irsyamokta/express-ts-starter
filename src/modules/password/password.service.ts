import crypto from "crypto";
import bcrypt from "bcrypt";
import passwordRepository from "@modules/password/password.repository";
import { ENV } from "@config/env";
import { ApiError } from "@errors/ApiError";
import { validate } from "@utils/validator";
import { changePasswordSchema, forgotPasswordSchema, resetPasswordSchema } from "@modules/password/password.validator";
import { sendEmail } from "@utils/mailer";
import { renderEmailTemplate } from "@utils/template";

const changePassword = async (userId: string, currentPassword: string, newPassword: string) => {
    validate(changePasswordSchema, { currentPassword, newPassword });

    const user = await passwordRepository.findUserById(userId);
    if (!user) throw new ApiError(404, "User not found");
    if (!user.isVerified) throw new ApiError(401, "Email not verified");

    const isValid = await bcrypt.compare(currentPassword, user.password);
    if (!isValid) throw new ApiError(401, "Invalid current password");

    const hashed = await bcrypt.hash(newPassword, 10);

    return passwordRepository.updatePassword(user.id, hashed);
};

const forgotPassword = async (email: string) => {
    validate(forgotPasswordSchema, { email });

    const user = await passwordRepository.findUserByEmail(email);
    if (!user) throw new ApiError(404, "User not found");
    if (!user.isVerified) throw new ApiError(401, "Email not verified");
    if (user.resetPasswordToken && user.resetPasswordExp != null && user.resetPasswordExp > new Date()) throw new ApiError(400, "Password reset link already sent");

    const token = crypto.randomBytes(64).toString("hex");
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await passwordRepository.updateResetPasswordToken(user.id, token, expiresAt);

    const html = renderEmailTemplate("reset-password", {
        name: user.name,
        resetPasswordLink: `${ENV.CLIENT_URL}/password/reset?token=${token}`,
        appName: ENV.APP_NAME,
    });
    await sendEmail(email, "Reset your password", html);

    return { message: "Password reset link sent to your email" };
};

const resetPassword = async (token: string, newPassword: string) => {
    validate(resetPasswordSchema, { newPassword });

    const user = await passwordRepository.findUserByResetPasswordToken(token);
    if (!user) throw new ApiError(400, "Invalid token");
    if (user.resetPasswordExp != null && user.resetPasswordExp < new Date()) throw new ApiError(400, "Token expired");

    const hashed = await bcrypt.hash(newPassword, 10);

    return passwordRepository.updatePassword(user.id, hashed);
};

export default { changePassword, forgotPassword, resetPassword };