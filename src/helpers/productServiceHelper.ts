import ProductDto from "../dtos/productDto";
import { IProduct } from "../interfaces/productModel";

export const generateProductResponse = async (product: IProduct) => {
    const productDto = new ProductDto({ ...product.toObject(), id: `${product._id}` });

    return {
        product: productDto
    };
};