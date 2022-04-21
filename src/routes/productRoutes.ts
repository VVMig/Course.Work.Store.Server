import * as express from 'express';
import { ProductController } from '../controllers/productController';
import { Routes } from '../constants/Routes';
import adminMiddleware from '../middlewares/ApiAdminMiddleware';
import authMiddleware from '../middlewares/ApiAuthMiddleware';

const router = express.Router();

const productController = new ProductController();

router.post(Routes.PRODUCT_ADD, authMiddleware, adminMiddleware, productController.addProduct);
router.post(Routes.PRODUCT_REMOVE, authMiddleware, adminMiddleware, productController.removeProduct);
router.get(Routes.PRODUCT_CATEGORIES, productController.getCategories);
router.get(Routes.PRODUCT_PRODUCT, productController.getProduct);
router.get(Routes.PRODUCT_CATEGORY, productController.getProductsByCategory);
router.get(Routes.PRODUCT_SEARCH, productController.searchProducts);
router.get(Routes.PRODUCT_ALL, authMiddleware, adminMiddleware, productController.getAllProducts);
router.get(Routes.PRODUCT_NEW, productController.newProducts);
router.get(Routes.PRODUCT_POPULAR, productController.getPopularProducts);
router.put(Routes.PRODUCT_EDIT, authMiddleware, adminMiddleware, productController.editProduct);

export default router;
