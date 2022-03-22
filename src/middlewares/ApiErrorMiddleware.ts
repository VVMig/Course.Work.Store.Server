import { NextFunction, Request, Response } from "express";
import ApiError from "../exceptions/api-error";
import { ApiErrorMessages } from "../constants/ErrorMessages";
import { StatusCodes } from "../constants/StatusCodes";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (err: ApiError, _req: Request, res: Response, _next: NextFunction) => {
    console.log(err);

    if (err instanceof ApiError) {
        return res.status(err.status).json({
            message: err.message,
            errors: err.errors
        });
    }

    return res.status(StatusCodes.INTERNAL_ERROR).json({
        message: ApiErrorMessages.INTERNAL_ERROR,
        error: err
    });
};
