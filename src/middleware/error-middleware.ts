import { NextFunction, Request, Response } from "express";
import { CustomError } from "../error/api-errors";

export const ErrorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof CustomError) {
        const statusCode = err.statusCode || 500;
        const message = err.message || "unexpected error";
        return res.status(statusCode).json({status: statusCode, message: message});
    }

    return res.status(500).json({status: 500, message: "Internal server error"});
}
