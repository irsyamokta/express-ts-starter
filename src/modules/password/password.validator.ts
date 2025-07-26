import Joi from "joi";

const changePasswordSchema = Joi.object({
    currentPassword: Joi.string()
        .required()
        .min(8)
        .messages({
            "string.empty": "Current password is required",
            "string.min": "Current password must be at least 8 characters long",
        }),
    newPassword: Joi.string()
        .required()
        .min(8)
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
        .messages({
            "string.empty": "New password is required",
            "string.min": "New password must be at least 8 characters long",
            "string.pattern.base":
                "New password must contain at least one letter and one number, and be at least 8 characters long",
        }),
});

const forgotPasswordSchema = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .messages({
            "string.empty": "Email is required",
            "string.email": "Invalid email format",
        }),
});

const resetPasswordSchema = Joi.object({
    newPassword: Joi.string()
        .required()
        .min(8)
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
        .messages({
            "string.empty": "Password is required",
            "string.min": "Password must be at least 8 characters long",
            "string.pattern.base":
                "Password must contain at least one letter and one number, and be at least 8 characters long",
        }),
});

export { changePasswordSchema, forgotPasswordSchema, resetPasswordSchema };