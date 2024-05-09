import ErrorResponse from "../error/error-response.js";

const errorMiddleware = (err, req, res, next) => {
    if (err instanceof ErrorResponse) {
        res.status(err.status).json({
            errors: err.message
        })
    } else {
        next()
    }
}

export default errorMiddleware