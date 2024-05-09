import {prismaClient} from "../application/database.js";

const roleMiddleware = async (req, res, next) => {
    const token = req.get("Authorization")

    const user = await prismaClient.user.findFirst({
        where: {
            token: token
        },
        select: {
            role: true
        }
    })

    if(user.role === "USER") {
        res.status(400).send({
            error: "You role is not ADMIN"
        })
    }

    next()
}

export default roleMiddleware