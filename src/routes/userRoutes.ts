import * as express from 'express';
import { Routes } from '../constants/routes';
import { UserController } from '../controllers/userController';

const router = express.Router();

const userController = new UserController();

router.post(Routes.USER_REGISTRATION, userController.registration);
router.post(Routes.USER_LOGIN, userController.login);

export default router;
