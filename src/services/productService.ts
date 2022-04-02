import { CommonErrorMessages, ProductErrorMessages } from '../constants/ErrorMessages';
import ApiError from '../exceptions/api-error';
import { Category } from '../constants/Category';
import { IAddProduct } from '../interfaces/productController';
import { ProductModel } from '../models/Product';
import { generateProductResponse } from '../helpers/productServiceHelper';
import { getAllCategories } from '../helpers/common';

class ProductService {
    async addProduct({ amount, briefInformation, description, images, price, title, commonId, category }: IAddProduct) {
        if (!amount || !price || !title || !category) {
            throw ApiError.BadRequest(ProductErrorMessages.REQUIRED_FIELDS);
        }

        if (!Object.values(Category).includes(category)) {
            throw ApiError.BadRequest(ProductErrorMessages.INVALID_CATEGORY);
        }

        const product = await ProductModel.create({
            price,
            amount,
            briefInformation,
            description,
            title,
            commonId,
            category
        });

        return generateProductResponse(product);
    }

    async getProduct(id: string) {
        const product = await ProductModel.findById(id);

        if (!product) {
            throw ApiError.BadRequest(CommonErrorMessages.INVALID_ID);
        }

        return generateProductResponse(product);
    }

    async getProductsByCategory(category: string) {
        const categories = getAllCategories();

        if (!categories.includes(category as Category)) {
            throw ApiError.BadRequest(ProductErrorMessages.INVALID_CATEGORY);
        }

        const products = await ProductModel.find({ category });

        if (!ProductErrorMessages) {
            throw ApiError.BadRequest(CommonErrorMessages.INVALID_ID);
        }

        return products.map(generateProductResponse).map(product => ({ ...product.product }));
    }

    async removeProduct(id: string) {
        if (!id) {
            throw ApiError.BadRequest(ProductErrorMessages.REQUIRED_FIELDS);
        }

        const product = await ProductModel.findById(id);

        if (!product) {
            throw ApiError.BadRequest(CommonErrorMessages.INVALID_ID);
        }

        await product.delete();
    }
}

export default new ProductService();