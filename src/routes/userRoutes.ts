import * as express from 'express';
import { Routes } from '../constants/Routes';
import { UserController } from '../controllers/userController';
import adminMiddleware from '../middlewares/ApiAdminMiddleware';
import authMiddleware from '../middlewares/ApiAuthMiddleware';


const router = express.Router();

const userController = new UserController();

router.post(Routes.USER_REGISTRATION, userController.registration);
router.post(Routes.USER_LOGIN, userController.login);
router.post(Routes.USER_REFRESH_TOKEN, userController.refreshToken);
router.put(Routes.USER_ROLE, authMiddleware, adminMiddleware, userController.changeRole);
router.get(Routes.USER_USERS, authMiddleware, adminMiddleware, userController.getUsersList);
router.get(Routes.USER_DATA, authMiddleware, userController.getUserData);
router.get(`${Routes.USER_VERIFICATION}/:id`, userController.verifyUser);
router.get(Routes.USER_GMAIL_AUTH, userController.gmailAuth);
router.get(Routes.USER_GMAIL_AUTH_CALLBACK, userController.gmailAuthCallback);
router.post(Routes.USER_ADD_CART, authMiddleware, userController.addCart);
router.post(Routes.USER_REMOVE_CART, authMiddleware, userController.removeCart);
router.post(Routes.USER_PURCHASE, authMiddleware, userController.purchase);
router.post(Routes.USER_DELETE, authMiddleware, adminMiddleware, userController.deleteUsers);


export default router;
