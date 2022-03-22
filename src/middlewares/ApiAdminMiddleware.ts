import { NextFunction, Response } from "express";
import { UserRoles } from "../constants/Roles";
import ApiError from "../exceptions/api-error";

import { AuthRequest } from '../interfaces/authRequest';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        if (req.user?.role !== UserRoles.ADMIN) {
            return next(ApiError.PermissionError());
        }

        next();
    } catch (error) {
        next(error);
    }
};
