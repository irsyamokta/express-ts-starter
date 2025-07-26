import prisma from "@config/prisma";

export const findUserById = (id: string) => prisma.user.findUnique({ where: { id } });

export const findUserByEmail = (email: string) => prisma.user.findUnique({ where: { email } });

const findUserByResetPasswordToken = (token: string) => prisma.user.findUnique({ where: { resetPasswordToken: token } });

const updatePassword = (id: string, password: string) => prisma.user.update({ where: { id }, data: { password, resetPasswordToken: null, resetPasswordExp: null } });

const updateResetPasswordToken = (id: string, resetPasswordToken: string, resetPasswordExp: Date) => prisma.user.update({ where: { id }, data: { resetPasswordToken, resetPasswordExp } });

export default { findUserById, findUserByEmail, findUserByResetPasswordToken, updatePassword, updateResetPasswordToken };