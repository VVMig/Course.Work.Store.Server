import { Document, ObjectId, Schema } from "mongoose";

export interface IUser extends Document {
    _id: ObjectId;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    isVerified: boolean;
    verifiedToken: string;
    token: string;
    refreshToken: string;
}

export type UserDocument = Document<unknown, any, IUser> & IUser & {
    _id: Schema.Types.ObjectId;
}