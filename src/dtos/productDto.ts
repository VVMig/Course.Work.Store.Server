import { Category } from "constants/Category";
import { IProductDTO } from "../interfaces/dtos";
import { IProductImage } from "../interfaces/productModel";

export default class ProductDto implements IProductDTO {
    id: string;
    description: string;
    price: number;
    title: string;
    briefInformation: string;
    images: IProductImage[];
    amount: number;
    commonId: string;
    category: Category;

    constructor({ id, title, description, price, briefInformation, images, amount, commonId, category }: IProductDTO) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.id = id;
        this.briefInformation = briefInformation;
        this.images = images;
        this.amount = amount;
        this.commonId = commonId;
        this.category = category;
    }
}