import { NextFunction, Response } from "express";
import ApiError from "../exceptions/api-error";

import { AuthRequest } from '../interfaces/authRequest';
import tokenService from '../services/tokenService';
import userService from '../services/userService';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return next(ApiError.UnauthorizedError());
        }

        const accessToken = authHeader.split(' ')[1];

        if (!accessToken) {
            return next(ApiError.UnauthorizedError());
        }

        const userData = tokenService.validateToken(accessToken);

        if (!userData) {
            return next(ApiError.UnauthorizedError());
        }

        const isAuthUser = await userService.isAuthUser(userData.id, accessToken);

        if (!isAuthUser) {
            return next(ApiError.UnauthorizedError());
        }

        req.user = userData;
        next();
    } catch (error) {
        next(error);
    }
};
