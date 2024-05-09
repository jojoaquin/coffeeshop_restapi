import categoryService from "../service/category-service.js";

const create = async (req, res, next) => {
    try {
        const category = await categoryService.create(req.body)
        res.status(200).json(category)
    } catch (e) {
        next(e)
    }
}

const getAll = async (req, res, next) => {
    try {
        const categories = await categoryService.getAllCategories()
        res.status(200).json(categories)
    } catch (e) {
        next(e)
    }
}

const getById = async (req, res, next) => {
    try {
        const category = await categoryService.getById(req.params.categoryId)
        res.status(200).json(category)
    } catch (e) {
        next(e)
    }
}

const updateById = async (req, res, next) => {
    try {
        const category = await categoryService.updateById(req.body, req.params.categoryId)
        res.status(200).json(category)
    } catch (e) {
        next(e)
    }
}

const deleteById = async (req, res, next) => {
    try {
        const category = await categoryService.deleteById(req.params.categoryId)
        res.status(200).json({
            message: "Category is deleted"
        })
    } catch (e) {
        next(e)
    }
}

export default {
    create, getAll, getById, updateById, deleteById
}