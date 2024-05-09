import Joi from "joi";

const register = Joi.object({
    username: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(15).required(),
    role: Joi.string().valid("USER", "ADMIN").required()
})

const login = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(15).required()
})

export default {
    register,
    login
}