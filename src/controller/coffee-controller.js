import coffeeService from "../service/coffee-service.js";

const create = async (req, res, next) => {
    try {
        const coffee = await coffeeService.create(req.body, req.files)
        res.status(200).json(
            coffee
        )
    } catch (e) {
        next(e)
    }
}

const getAll = async (req, res, next) => {
    try {
        const coffees = await coffeeService.getAllCoffee()
        res.status(200).json(coffees)
    } catch (e) {
        next(e)
    }
}
const getById = async (req, res, next) => {
    try {
        const coffee = await coffeeService.getById(req.params.coffeeId)
        res.status(200).json(coffee)
    } catch (e) {
        next(e)
    }
}

const deleteById = async (req, res, next) => {
    try {
        await coffeeService.deleteById(req.params.coffeeId)
        res.status(200).json({
            message: "Coffee is deleted"
        })
    } catch (e) {
        next(e)
    }
}


export default {
    create, getAll, getById, deleteById
}