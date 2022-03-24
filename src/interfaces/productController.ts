import ProductDto from "../dtos/productDto";

export type IAddProduct = Pick<ProductDto, 'amount' | 'briefInformation' | 'description' | 'price' | 'title' | 'images' | 'commonId' | 'category'>;
