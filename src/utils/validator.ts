import Joi from "joi";
import { ApiError } from "@errors/ApiError";

export const validate = (schema: Joi.ObjectSchema, data: any) => {
    const { error, value } = schema.validate(data, { abortEarly: false });
    if (error) {
        const message = error.details.map((d) => d.message).join(", ");
        throw new ApiError(400, message);
    }
    return value;
};
