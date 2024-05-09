import Joi from "joi";

const insert = Joi.object({
    name: Joi.string().min(3).required(),
    stock: Joi.number().min(1).required(),
    price: Joi.number().min(1000).required(),
    categoryId: Joi.number().required()
})

export default {
    insert
}