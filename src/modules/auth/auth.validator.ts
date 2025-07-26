import Joi from "joi";

export const registerSchema = Joi.object({
    name: Joi.string()
        .required()
        .min(3)
        .max(50)
        .regex(/^[A-Za-z\s]+$/)
        .messages({
            "string.empty": "Name is required",
            "string.min": "Name must be at least 3 characters long",
            "string.max": "Name must be at most 50 characters long",
            "string.pattern.base": "Name must contain only letters and spaces",
        }),
    email: Joi.string()
        .email()
        .required()
        .messages({
            "string.empty": "Email is required",
            "string.email": "Invalid email format",
        }),
    password: Joi.string()
        .min(8)
        .required()
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
        .messages({
            "string.empty": "Password is required",
            "string.min": "Password must be at least 8 characters long",
            "string.pattern.base":
                "Password must contain at least one letter and one number, and be at least 8 characters long",
        }),
});
