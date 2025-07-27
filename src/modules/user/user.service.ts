import userRepository from "@modules/user/user.repository";
import { ApiError } from "@errors/ApiError";
import { validate } from "@utils/validator";
import userSchema from "@modules/user/user.validator";

interface UpdateUserInput {
    name: string;
    phone?: string;
    bio?: string;
    avatar?: string;
}

interface CurrentUser {
    id: string;
    role: "USER" | "ADMIN";
}

const updateUser = async (
    currentUser: CurrentUser,
    targetUserId: string,
    data: UpdateUserInput
) => {
    validate(userSchema, data);

    if (currentUser.role !== "ADMIN" && currentUser.id !== targetUserId) {
        throw new ApiError(403, "You are not allowed to update this user");
    }

    const user = await userRepository.findUserById(targetUserId);
    if (!user) throw new ApiError(404, "User not found");

    return userRepository.updateUser(targetUserId, data);
};

const deleteUser = async (
    currentUser: CurrentUser,
    targetUserId: string
) => {

    if (currentUser.role !== "ADMIN" && currentUser.id !== targetUserId) {
        throw new ApiError(403, "You are not allowed to delete this user");
    }

    const user = await userRepository.findUserById(targetUserId);
    if (!user) throw new ApiError(404, "User not found");

    return userRepository.deleteUser(targetUserId);
};

export default { updateUser, deleteUser };
