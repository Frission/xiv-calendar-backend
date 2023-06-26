import { ErrorRequestHandler } from "express";
import { BaseError } from "../errors/BaseError";

export const globalErrorHandler: ErrorRequestHandler = (error: Partial<BaseError>, req, res, next) => {
    console.log("Error reached global error handler.")
    console.log("Path: ", req.path)


    if (error instanceof BaseError) {
        console.log(error.name + ": " + error.message)

        if (error.originalErr != null)
            console.error(error.originalErr)

        res.status(error.status ?? 500).send(
            {
                name: error.name ?? "Internal Server Error",
                message: error.message ?? "An internal server error occurred.",
                status: error.status ?? 500
            } satisfies BaseError
        )
    } else {
        console.error("Error: ", error)

        res.status(500).send(
            {
                name: "Internal Server Error",
                message: "An internal server error occurred.",
                status: 500
            } satisfies BaseError
        )
    }
}