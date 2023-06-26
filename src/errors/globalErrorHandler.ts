import { ErrorRequestHandler } from "express";
import { BaseError } from "./BaseError";

export const globalErrorHandler: ErrorRequestHandler = (error: Partial<BaseError>, req, res, next) => {
    console.log("Error reached global error handler.")
    console.log("Path: ", req.path)
    console.error("Error: ", error)

    if (error?.type == "redirect") {
        res.redirect("/error")
    } else if (error.type == "handled") {
        res.status(error.status ?? 500).send(
            {
                name: error.name ?? "Internal Server Error",
                message: error.message ?? "An internal server error occurred.",
                status: error.status ?? 500
            } satisfies BaseError
        )
    } else {
        res.status(500).send(
            {
                name: "Internal Server Error",
                message: "An internal server error occurred.",
                status: 500
            } satisfies BaseError
        )
    }
}