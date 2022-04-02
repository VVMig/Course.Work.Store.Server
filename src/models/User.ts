import mongoose, { Model, Schema } from 'mongoose';
import { IUser } from '../interfaces/userModel';
import { UserRoles } from '../constants/Roles';

const userSchema: Schema<IUser> = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        default: UserRoles.USER
    },
    password: {
        type: String,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verifiedUrl: {
        type: String
    },
    token: {
        type: String
    },
    refreshToken: {
        type: String
    },
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        default: [],
        ref: 'Product'
    }]
});

export const UserModel: Model<IUser> = mongoose.model('User', userSchema);