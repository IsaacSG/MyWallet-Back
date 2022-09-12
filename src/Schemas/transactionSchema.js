import joi from "joi";

export const transSchema = joi.object({
    type: joi.string().required(),
    value: joi.string().required(),
    description: joi.string().required()
});