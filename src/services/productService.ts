import { CommonErrorMessages, ProductErrorMessages } from '../constants/ErrorMessages';
import ApiError from '../exceptions/api-error';
import { Category } from '../constants/Category';
import { IAddProduct } from '../interfaces/productController';
import { ProductModel } from '../models/Product';
import { generateProductResponse } from '../helpers/productServiceHelper';

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