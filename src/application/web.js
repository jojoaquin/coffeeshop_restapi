import express from "express";
import {adminRouter, publicRouter, userRouter} from "../router.js";
import errorMiddleware from "../middleware/error-middleware.js";

const web = express()
web.use(express.json())
web.use("/coffee-images", express.static("coffee-images"))

web.use(publicRouter)
web.use(userRouter)
web.use(adminRouter)

web.use(errorMiddleware)

export default web;