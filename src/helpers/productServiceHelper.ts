import { IProduct } from "../interfaces/productModel";
import ProductDto from "../dtos/productDto";
import { IProductDTO } from "interfaces/dtos";

export const generateProductResponse = (product: IProduct) => {
    const productDto = new ProductDto({ ...product.toObject(), id: `${product._id}` });

    return {
        product: productDto
    };
};

export const countTotalPrice = (products: IProductDTO[]) => products.reduce((total, product) => total + product.price, 0);
