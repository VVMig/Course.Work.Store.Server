import * as express from 'express';
import { Routes } from '../constants/Routes';
import { UserController } from '../controllers/userController';
import authMiddleware from '../middlewares/ApiAuthMiddleware';

const router = express.Router();

const userController = new UserController();

/**
 * @openapi
 * /:
 *   post:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.post(Routes.USER_REGISTRATION, userController.registration);

router.post(Routes.USER_LOGIN, userController.login);
router.post(Routes.USER_REFRESH_TOKEN, userController.refreshToken);
router.get(Routes.USER_DATA, authMiddleware, userController.getUserData);
router.get(`${Routes.USER_VERIFICATION}/:id`, userController.verifyUser);
router.get(Routes.USER_GMAIL_AUTH, userController.gmailAuth);
router.get(Routes.USER_GMAIL_AUTH_CALLBACK, userController.gmailAuthCallback);

export default router;
