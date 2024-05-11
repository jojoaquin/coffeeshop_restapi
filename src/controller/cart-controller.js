import cartService from "../service/cart-service.js";

const addToCart = async(req, res, next) => {
    try {
        const cart = await cartService.addToCart(req.body, req.get("Authorization"), req.params.coffeeId)

        res.status(200).json(cart)
    } catch (e) {
        next(e)
    }

}

const cart = async (req, res, next) => {
    try {
        const cart = await cartService.cart(req.get("Authorization"))
        console.info(req.get("Authorization"))

        res.status(200).json(cart)
    } catch (e) {
        next(e)
    }
}

export default {
    addToCart,
    cart
}