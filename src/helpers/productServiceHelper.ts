import { IProduct } from "../interfaces/productModel";
import ProductDto from "../dtos/productDto";

export const generateProductResponse = (product: IProduct) => {
    const productDto = new ProductDto({ ...product.toObject(), id: `${product._id}` });

    return {
        product: productDto
    };
};