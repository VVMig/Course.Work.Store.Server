"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Roles_1 = require("../constants/Roles");
const userSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        default: Roles_1.UserRoles.USER
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
            type: mongoose_1.default.Schema.Types.ObjectId,
            default: [],
            ref: 'Product'
        }]
});
exports.UserModel = mongoose_1.default.model('User', userSchema);
//# sourceMappingURL=User.js.map