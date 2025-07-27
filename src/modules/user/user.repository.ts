import prisma from "@config/prisma";

const findUserById = (id: string) => prisma.user.findUnique({ where: { id } });

const findUserByEmail = (email: string) => prisma.user.findUnique({ where: { email } });

const updateUser = (id: string, data: any) => prisma.user.update({ where: { id }, data });

const deleteUser = (id: string) => prisma.user.delete({ where: { id } });

export default { findUserById, findUserByEmail, updateUser, deleteUser };