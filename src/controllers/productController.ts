import { NextFunction, Response, Request } from 'express';
import { AuthRequest } from '../interfaces/authRequest';
import { IAddProduct } from '../interfaces/productController';
import { StatusCodes } from '../constants/StatusCodes';
import { getAllCategories } from '../helpers/common';
import productService from '../services/productService';

class ProductController {
    async addProduct(req: AuthRequest<IAddProduct>, res: Response, next: NextFunction) {
        try {
            const {
                amount,
                briefInformation,
                description,
                images,
                price,
                title,
                commonId,
                category
            } = req.body;

            const product = await productService.addProduct({
                amount,
                briefInformation,
                description,
                images,
                price,
                title,
                commonId,
                category
            });

            res.json(product);
        } catch (error) {
            next(error);
        }
    }

    async removeProduct(req: AuthRequest<{ id: string }>, res: Response, next: NextFunction) {
        try {
            const {
                id
            } = req.body;

            await productService.removeProduct(id);

            res.status(StatusCodes.SUCCESS).json();
        } catch (error) {
            next(error);
        }
    }

    async getCategories(req: Request, res: Response, next: NextFunction) {
        try {
            res.json({
                categories: getAllCategories()
            });
        } catch (error) {
            next(error);
        }
    }

    async getProduct(req: Request<any, any, any, { id?: string }>, res: Response, next: NextFunction) {
        try {
            const { id } = req.query;

            const product = await productService.getProduct(id);

            res.json(product);
        } catch (error) {
            next(error);
        }
    }

    async getProductsByCategory(req: Request<any, any, any, { category?: string }>, res: Response, next: NextFunction) {
        try {
            const { category } = req.query;

            const products = await productService.getProductsByCategory(category);

            res.json(products);
        } catch (error) {
            next(error);
        }
    }

    async searchProducts(req: Request<any, any, any, { text?: string }>, res: Response, next: NextFunction) {
        try {
            const { text } = req.query;

            const products = await productService.searchProducts(text);

            res.json(products);
        } catch (error) {
            next(error);
        }
    }

    async newProducts(req: Request<any, any, any, { limit?: string }>, res: Response, next: NextFunction) {
        try {
            const { limit } = req.query;

            const products = await productService.newProducts(+limit);

            res.json(products);
        } catch (error) {
            next(error);
        }
    }
}

export {
    ProductController
};