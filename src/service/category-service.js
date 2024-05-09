import validate from "../validation/validation.js";
import categorySchema from "../validation/category-schema.js";
import {prismaClient} from "../application/database.js";
import ErrorResponse from "../error/error-response.js";

const create = async (request) => {
    const req = validate(categorySchema.category, request)

    const count = await prismaClient.coffeeCategory.count({
        where: {
            name: req.name
        }
    })

    if (count >= 1) {
        throw new ErrorResponse(400, "Category is already exists")
    }

    return prismaClient.coffeeCategory.create({
        data: {
            name: req.name
        }
    })
}

const getAllCategories = async () => {
    return prismaClient.coffeeCategory.findMany({})
}

const getById = async (categoryId) => {
    const category = await prismaClient.coffeeCategory.findUnique({
        where: {
            id: parseInt(categoryId)
        },
        include: {
            coffee: {
                select: {
                    id: true,
                    name: true,
                    image: true,
                    stock: true,
                    price: true
                }
            }
        }
    })

    if (!category) {
        throw new ErrorResponse(404, "Category is not found")
    }

    return category;
}

const updateById = async (request, categoryId) => {
    const req = validate(categorySchema.category, request)

    const count = await prismaClient.coffeeCategory.count({
        where: {
            id: parseInt(categoryId)
        }
    })

    if (count === 0) {
        throw new ErrorResponse("Category is not found")
    } else {
        const category = await prismaClient.coffeeCategory.count({
            where: {
                name: req.name
            }
        })

        if (category >= 1) {
            throw new ErrorResponse(400, "Category is already exists")
        }

        return prismaClient.coffeeCategory.update({
            where: {
                id: parseInt(categoryId)
            },
            data: {
                name: req.name
            }
        })
    }
}

const deleteById = async (categoryId) => {
    const category = await prismaClient.coffeeCategory.findUnique({
        where: {
            id: parseInt(categoryId)
        },
        include: {
            coffee: true
        }
    })

    if (!category) {
        throw new ErrorResponse(404, "Category is not found")
    }

    if (category.coffee.length === 0) {
        await prismaClient.coffeeCategory.delete({
            where: {
                id: parseInt(categoryId)
            }
        })
    } else {
        throw new ErrorResponse(400, "There are still coffess that have not been deleted")
    }


}

export default {
    create, getAllCategories, getById, updateById, deleteById
}