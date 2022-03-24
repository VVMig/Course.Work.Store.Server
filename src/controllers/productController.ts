import { NextFunction, Response, Request } from 'express';
import { AuthRequest } from '../interfaces/authRequest';
import { IAddProduct } from '../interfaces/productController';
import { StatusCodes } from '../constants/StatusCodes';
import productService from '../services/productService';
import { getAllCategories } from '../helpers/common'

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
}

export {
    ProductController
};