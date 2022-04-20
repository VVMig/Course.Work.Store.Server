"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
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
    },
    category: {
        type: String
    }
});
exports.ProductModel = mongoose_1.default.model('Product', productSchema);
//# sourceMappingURL=Product.js.map