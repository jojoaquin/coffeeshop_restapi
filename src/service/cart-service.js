import {prismaClient} from "../application/database.js";
import ErrorResponse from "../error/error-response.js";
import validate from "../validation/validation.js";
import cartValidation from "../validation/cart-validation.js";

const getUserId = async (token) => {
    const user = await prismaClient.user.findFirst({
        where: {
            token: token
        },
        select: {
            id:true
        }
    })

    return user.id;
}

const isCoffeeExists = async (coffeeId, qty) => {
    const coffee = await prismaClient.coffee.findUnique({
        where: {
            id: coffeeId
        }
    })

    if(coffee.stock < qty) {
        throw new ErrorResponse(404, "Coffee is out of stock")
    }

    if(!coffee) {
        throw new ErrorResponse(404, "Coffee is not found")
    }

    return coffee
}

const addToCart = async (request, token, coffeeId) => {
    const req = validate(cartValidation.addToCart, request)

    const userId = await getUserId(token)
    const coffee = await isCoffeeExists(coffeeId, req.qty)

    await prismaClient.coffee.update({
        where: {
            id: coffeeId
        },
        data: {
            stock: {
                decrement: req.qty
            }
        }
    })

    return prismaClient.cart.create({
        data: {
            userId: userId,
            coffeeId: coffeeId,
            status: "UNPAID",
            qty: req.qty,
            totalPrice: req.qty * coffee.price
        },
        select: {
            coffee: true,
            qty: true,
            totalPrice: true,
            status: true
        }
    })

}

const cart = async (token) => {
    const userId = await getUserId(token)

    const user = await prismaClient.user.findUnique({
        where: {
            id: userId
        },
        select: {
            cart: {
                where: {
                    status: "UNPAID"
                },
                select: {
                    id: true,
                    coffee: true,
                    qty: true,
                    totalPrice: true,
                    status: true
                }
            }
        }
    })

    let sumAllPrice = 0;
    for (let i = 0; i < user.cart.length; i++) {
        sumAllPrice += parseInt(user.cart[i].totalPrice)
    }
    if(user.cart.length === 0) {
        throw new ErrorResponse(404, "Cart is empty")
    }
    return {
        cart: user.cart,
        summaryPrice: sumAllPrice
    };
}

const deleteCart = async (token, cartId) => {
    const userId = await getUserId(token)

    const cart = await prismaClient.cart.findUnique({
        where: {
            id: parseInt(cartId),
            userId: userId,
            status: "UNPAID"
        }
    })

    if(!cart) {
        throw new ErrorResponse(404, "Cart is not found")
    }

    await prismaClient.cart.delete({
        where: cart
    })

}

export default {
    addToCart,
    cart,
    deleteCart
}