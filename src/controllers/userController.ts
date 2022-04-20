import { ICartAddBody, IGoogleOAuth2Query, IPurchaseBody, IUserLoginBody, IUserRefreshTokenBody, IUserRegistrationBody, IUserVerificationParams } from '../interfaces/userController';
import { NextFunction, Request, Response } from 'express';
import { AuthRequest } from '../interfaces/authRequest';
import { googleAuthUrl } from '../configs/googleOAuth2';
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

    async refreshToken(req: Request<any, any, IUserRefreshTokenBody>, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.body;

            const user = await userService.refreshToken(refreshToken);

            return res.json(user);
        } catch (error) {
            next(error);
        }
    }

    async getUserData(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const userData = req.user;

            const user = await userService.getUserData(userData.id);

            return res.json(user);
        } catch (error) {
            next(error);
        }
    }

    async verifyUser(req: Request<IUserVerificationParams>, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;

            const isVerificationSuccess = await userService.verifyUser(id);

            if (isVerificationSuccess) {
                res.redirect(process.env.CLIENT_VERIFICATION_URL_SUCCESS);
            } else {
                res.redirect(process.env.CLIENT_VERIFICATION_URL_ERROR);
            }
        } catch (error) {
            next(error);
        }
    }

    async gmailAuth(req: Request, res: Response, next: NextFunction) {
        try {
            res.redirect(googleAuthUrl);
        } catch (error) {
            next(error);
        }
    }

    async gmailAuthCallback(req: Request<any, any, any, IGoogleOAuth2Query>, res: Response, next: NextFunction) {
        try {
            const user = await userService.googleLogin(req.query.code);

            res.redirect(`${process.env.CLIENT_URL}?credentials=${JSON.stringify(user)}`);
        } catch (error) {
            next(error);
        }
    }

    async addCart(req: AuthRequest<ICartAddBody>, res: Response, next: NextFunction) {
        try {
            const cart = await userService.addCart(req.user.id, req.body.id);

            res.json({
                cart
            });
        } catch (error) {
            next(error);
        }
    }

    async removeCart(req: AuthRequest<ICartAddBody>, res: Response, next: NextFunction) {
        try {
            const cart = await userService.removeCart(req.user.id, req.body.id);

            res.json({
                cart
            });
        } catch (error) {
            next(error);
        }
    }

    async purchase(req: AuthRequest<IPurchaseBody>, res: Response, next: NextFunction) {
        try {
            const { address, amount, commentary, ids, tel, paymentMethod } = req.body;

            const cart = await userService.purchase(req.user.id, ids, address, amount, commentary, tel, paymentMethod);

            res.json(cart);
        } catch (error) {
            next(error);
        }
    }

    async changeRole(req: AuthRequest<{ role: string, userIds: string[] }>, res: Response, next: NextFunction) {
        try {
            const { role, userIds } = req.body;

            const users = await userService.changeRole(userIds, role);

            res.json(users);
        } catch (error) {
            next(error);
        }
    }

    async getUsersList(req: Request<any, any, any, { page?: string }>, res: Response, next: NextFunction) {
        try {
            const { page } = req.query;

            const listResponse = await userService.getUsersList(+page ?? 1);

            res.json(listResponse);
        } catch (error) {
            next(error);
        }
    }

    async deleteUsers(req: AuthRequest<{userIds: string[]}>, res: Response, next: NextFunction) {
        try {
            const { userIds } = req.body;

            const deletedIds = await userService.deleteUsers(userIds);

            res.json(deletedIds);
        } catch (error) {
            next(error);
        }
    }
}

export {
    UserController
};