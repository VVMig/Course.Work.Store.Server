import mongoose, { Model, Schema } from 'mongoose';
import { IUser } from '../interfaces/userModel';

const userSchema: Schema<IUser> = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
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
    }
});

export const UserModel: Model<IUser> = mongoose.model('User', userSchema);