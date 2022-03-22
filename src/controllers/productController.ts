import { IGoogleOAuth2Query, IUserLoginBody, IUserRefreshTokenBody, IUserRegistrationBody, IUserVerificationParams } from '../interfaces/userController';
import { NextFunction, Request, Response } from 'express';
import { AuthRequest } from '../interfaces/authRequest';
import { googleAuthUrl } from '../configs/googleOAuth2';
import userService from '../services/userService';

class ProductController {
    async addProduct(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            console.log(req.user);

            res.json(req.user);
        } catch (error) {
            next(error);
        }
    }
}

export {
    ProductController
};