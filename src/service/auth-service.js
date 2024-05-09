import validation from "../validation/validation.js";
import authSchema from "../validation/auth-schema.js";
import {prismaClient} from "../application/database.js";
import ErrorResponse from "../error/error-response.js";
import bcrypt from "bcrypt"
import {v4 as uuid} from "uuid"

const register = async (request) => {
    const req = validation(authSchema.register, request)

    const count = await prismaClient.user.count({
        where: {
            OR: [
                {
                    email: req.email
                },
                {
                    username: req.username
                }
            ]
        }
    })

    if(count >= 1) {
        throw new ErrorResponse(400, "Username or email is already exists")
    }

    const hashPassword = await bcrypt.hash(req.password, 10)

    return prismaClient.user.create({
        data: {
            email: req.email,
            username: req.username,
            password: hashPassword,
            role: req.role
        },
        select: {
            id: true,
            email: true,
            username: true
        }
    })
}

const login = async(request) => {
    const req = validation(authSchema.login, request)

    const user = await prismaClient.user.findUnique({
        where: {
            email: req.email
        },
        select: {
            email: true,
            password: true
        }
    })

    if (!user) {
        throw new ErrorResponse(401, "Email or Password is wrong")
    }

    const isPasswordValid = await bcrypt.compare(req.password, user.password)

    if (!isPasswordValid) {
        throw new ErrorResponse(401, "Email or Password is wrong")
    }

    return prismaClient.user.update({
        where: {
            email: req.email
        },
        data: {
            token: uuid().toString(),
            expired_at: Date.now() + (3 * 24 * 60 * 60 * 1000)
        },
        select: {
            token: true
        }
    })
}

export default {
    register,
    login
}