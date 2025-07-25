import Joi from "joi";

export const validate = (schema: Joi.ObjectSchema, data: any) => {
    const { error, value } = schema.validate(data, { abortEarly: false });
    if (error) throw new Error(error.details.map((d) => d.message).join(", "));
    return value;
};
