import validate from "../validation/validation.js";
import coffeeSchema from "../validation/coffee-schema.js";
import ErrorResponse from "../error/error-response.js";
import * as path from "node:path";
import {prismaClient} from "../application/database.js";
import fs from "node:fs/promises";

const imageValidation = (imgFile) => {
    if (!imgFile && !imgFile.image) {
        throw new ErrorResponse(400, "Image is required")
    }
    const imgExt = imgFile.image.name.split(".")
    const allowedExt = ["jpg", "png", "jpeg"]
    if (!allowedExt.includes(imgExt[imgExt.length - 1])) {
        throw new ErrorResponse(400, "Image extension must be jpg | png | jpeg")
    }
}

const isCoffeeNameAlreadyExists = async (coffeeName) => {
    const count = await prismaClient.coffee.count({
        where: {
            name: coffeeName
        }
    })

    if(count >= 1) {
        throw new ErrorResponse(400, "Coffee name is already exists")
    }
}

const isCategoryExists = async (categoryId) => {
    const count = await prismaClient.coffeeCategory.count({
        where: {
            id: categoryId
        }
    })

    if(count === 0) {
        throw new ErrorResponse(400, "Category is not exists")
    }
}

const create = async (request, imgFile) => {
    const req = validate(coffeeSchema.insert, request)
    imageValidation(imgFile)

    await isCoffeeNameAlreadyExists(req.name)
    await isCategoryExists(req.categoryId)

    const imgName = imgFile.image.name

    await imgFile.image.mv(path.resolve() + "/coffee-images/" + imgName)

    return prismaClient.coffee.create({
        data: {
            name: req.name,
            categoryId: req.categoryId,
            image: imgName,
            price: req.price,
            stock: req.stock
        },
        select: {
            id: true,
            name: true,
            image: true,
            stock: true,
            price: true,
            category: true
        }

    })
}

const getAllCoffee = async () => {
    return prismaClient.coffee.findMany({
        select: {
            id: true,
            name: true,
            image: true,
            stock: true,
            price: true,
            category: true
        }
    })
}

const getById = async (coffeeId) => {
    const coffee = await prismaClient.coffee.findUnique({
        where: {
            id: coffeeId
        }, select: {
            id: true,
            name: true,
            image: true,
            stock: true,
            price: true,
            category: true
        }
    })

    if(!coffee) {
        throw new ErrorResponse(404, "Coffee is not found")
    }

    return coffee;
}

const deleteById = async (coffeeId) => {
    const coffee = await prismaClient.coffee.findUnique({
        where: {
            id: coffeeId
        }
    })

    if(!coffee) {
        throw new ErrorResponse(404, "Coffee is not found")
    }

    await fs.unlink(path.resolve() + "/coffee-images/" + coffee.image)

    await prismaClient.coffee.delete({
        where: {
            id: coffeeId
        }
    })
}

export default {
    create, getAllCoffee, getById, deleteById
}