import { Category } from 'constants/Category';
import { IProductImage } from '../interfaces/productModel';
import { UserRoles } from "constants/Roles";

export interface IUserDTO {
    id: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    isVerified?: boolean;
    role?: UserRoles;
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
}
