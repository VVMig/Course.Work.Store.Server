import mongoose, { Model, Schema } from 'mongoose';
import { IUser } from '../interfaces/userModel';
import { UserRoles } from '../constants/Roles';
import { IProduct } from '../interfaces/productModel';

const productSchema: Schema<IProduct> = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: Number
    },
    images: [{
        type: {
            url: String,
            isMain: {
                type: Boolean,
                default: false
            }
        }
    }],
    amount: {
        type: Number
    },
    commonId: {
        type: String
    },
    briefInformation: {
        type: String
    }
});

export const ProductModel: Model<IProduct> = mongoose.model('Product', productSchema);