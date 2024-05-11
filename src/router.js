import express from "express";
import authController from "./controller/auth-controller.js";
import authMiddleware from "./middleware/auth-middleware.js";
import roleMiddleware from "./middleware/role-middleware.js";
import expressFileUpload from "express-fileupload"
import coffeeController from "./controller/coffee-controller.js";
import coffeeService from "./service/coffee-service.js";
import categoryController from "./controller/category-controller.js";
import cartController from "./controller/cart-controller.js";


const publicRouter = express.Router()
publicRouter.post("/register", authController.register)
publicRouter.post("/login", authController.login)


const userRouter = express.Router()
userRouter.use(authMiddleware)

userRouter.get("/user", (req, res, next) => {
    res.send("Hello")
})
userRouter.get("/coffee", coffeeController.getAll)
userRouter.get("/c/:coffeeId", coffeeController.getById)

userRouter.get("/category", categoryController.getAll)
userRouter.get("/category/:categoryId", categoryController.getById)

userRouter.post("/add-to-cart/:coffeeId", cartController.addToCart)
userRouter.get("/cart", cartController.cart)

const adminRouter = express.Router()
adminRouter.use(authMiddleware)
adminRouter.use(roleMiddleware)
adminRouter.use(expressFileUpload())

adminRouter.get("/admin", (req, res, next) => {
    res.send("Admin")
})
adminRouter.post("/create-coffee", coffeeController.create)
adminRouter.delete("/c/:coffeeId", coffeeController.deleteById)

adminRouter.post("/create-category", categoryController.create)
adminRouter.put("/update-category/:categoryId", categoryController.updateById)
adminRouter.delete("/delete-category/:categoryId", categoryController.deleteById)


export {
    publicRouter,
    userRouter,
    adminRouter
}