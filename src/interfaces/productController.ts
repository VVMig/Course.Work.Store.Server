import ProductDto from "../dtos/productDto";

export type IAddProduct = Pick<ProductDto, 'amount' | 'briefInformation' | 'description' | 'price' | 'title' | 'commonId' | 'category'> & {images: string[]};
