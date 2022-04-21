import { Category } from 'constants/Category';
import { IProduct, IProductImage } from '../interfaces/productModel';
import { UserRoles } from "constants/Roles";

export interface IUserDTO {
    id: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    isVerified?: boolean;
    role?: UserRoles;
    cart: IProduct[];
}

export interface IProductDTO {
    id: string;
    title: string;
    description: string;
    price: number;
    images: IProductImage[];
    amount: number;
    commonId: string;
    briefInformation: string;
    category: Category;
    transactionsAmount: number;
}
