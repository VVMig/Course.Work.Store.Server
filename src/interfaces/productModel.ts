import { Document, ObjectId } from "mongoose";
import { Category } from '../constants/Category';

export interface IProductImage {
    url: string;
    isMain: boolean;
}

export interface IProduct extends Document {
    _id: ObjectId;
    title: string;
    description: string;
    price: number;
    images: IProductImage[];
    amount: number;
    commonId: string;
    briefInformation: string;
    category: Category;
}