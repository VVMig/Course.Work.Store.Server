import { Document, ObjectId, Schema } from "mongoose";
import { UserRoles } from "constants/Roles";

export interface IUser extends Document {
    _id: ObjectId;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    isVerified: boolean;
    verifiedUrl: string;
    token: string;
    refreshToken: string;
    role: UserRoles;
}

export type UserDocument = Document<unknown, any, IUser> & IUser & {
    _id: Schema.Types.ObjectId;
}