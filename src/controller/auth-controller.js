import authService from "../service/auth-service.js";

const register = async (req, res, next) => {
    try {
        const user = await authService.register(req.body)
        res.status(200).json(
            user
        )
    } catch (e) {
        next(e)
    }
}

const login = async (req, res, next) => {
    try {
        const user = await authService.login(req.body)
        res.status(200).json({
            token: user.token
        })
    } catch (e) {
        next(e)
    }
}

export default {
    register,
    login
}