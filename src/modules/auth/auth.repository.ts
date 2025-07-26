import prisma from "@config/prisma";

const createUser = (name: string, email: string, password: string, verificationToken: string) =>
    prisma.user.create({ data: { name, email, password, verificationToken } });

const findUserByEmail = (email: string) =>
    prisma.user.findUnique({ where: { email } });

const findUserById = (id: string) =>
    prisma.user.findUnique({ where: { id }, select: { id: true, name: true, email: true, role: true } });

const createSession = (
    userId: string,
    device: string,
    ipAddress: string,
    refreshToken: string,
    expiresAt: Date
) =>
    prisma.session.create({
        data: { userId, device, ipAddress, refreshToken, expiresAt },
    });

const findSessionByRefreshToken = (refreshToken: string) =>
    prisma.session.findUnique({ where: { refreshToken } });

const deleteSession = (refreshToken: string) =>
    prisma.session.delete({ where: { refreshToken } });

const findUserByVerificationToken = (token: string) =>
    prisma.user.findUnique({ where: { verificationToken: token } });

const verifyEmail = (id: string) => 
    prisma.user.update({ where: { id: id }, data: { isVerified: true, verificationToken: null } });

export default {
    createUser,
    findUserByEmail,
    findUserById,
    createSession,
    findSessionByRefreshToken,
    deleteSession,
    findUserByVerificationToken,
    verifyEmail
};
