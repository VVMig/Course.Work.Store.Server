import { Document, ObjectId } from "mongoose";

export interface IProduct extends Document {
    _id: ObjectId;
    title: string;
    description: string;
    price: string;
    images: {
        url: string;
        isMain: boolean;
    }[];
    amount: number;
    commonId: string;
    briefInformation: string;
}