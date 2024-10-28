import { NextFunction, Request, Response } from "express";
import { CustomError } from "../error/api-errors";

export const ErrorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof CustomError) {

    }

    return res.status(500).json({status: 500, message: "Internal server error"});
}