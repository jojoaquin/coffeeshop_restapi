import Joi from "joi";

const addToCart = Joi.object({
    qty: Joi.number().min(1).required()
})

export default {
    addToCart
}