import Joi from "joi";

const category = Joi.object({
    name: Joi.string().min(3).required()
})

export default {
    category
}