import Joi from "joi";

const userSchema = Joi.object({
    name: Joi.string().required().min(3).max(50).regex(/^[A-Za-z\s]+$/).messages({
        "string.empty": "Name is required",
        "string.min": "Name must be at least 3 characters long",
        "string.max": "Name must be at most 50 characters long",
        "string.pattern.base": "Name must contain only letters and spaces",
    }),
});

export default userSchema;