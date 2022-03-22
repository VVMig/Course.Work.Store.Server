import * as express from 'express';
import { ProductController } from '../controllers/productController';
import { Routes } from '../constants/Routes';
import adminMiddleware from '../middlewares/ApiAdminMiddleware';
import authMiddleware from '../middlewares/ApiAuthMiddleware';

const router = express.Router();

const productController = new ProductController();

router.post(Routes.PRODUCT_ADD, authMiddleware, adminMiddleware, productController.addProduct);

export default router;
