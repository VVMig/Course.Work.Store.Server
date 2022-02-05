import { IUserLoginBody, IUserRegistrationBody } from '../interfaces/userController';
import { NextFunction, Request, Response } from 'express';
import userService from '../services/userService';

class UserController {
    async registration(req: Request<any, any, IUserRegistrationBody>, res: Response, next: NextFunction) {
        try {
            const { email, password, firstName, lastName } = req.body;

            const user = await userService.registration(email, password, firstName, lastName);

            return res.json(user);
        } catch (error) {
            next(error);
        }
    }

    async login(req: Request<any, any, IUserLoginBody>, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;

            const user = await userService.login(email, password);

            return res.json(user);
        } catch (error) {
            next(error);
        }
    }
}

export {
    UserController
};