"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.countTotalPrice = exports.generateProductResponse = void 0;
const productDto_1 = __importDefault(require("../dtos/productDto"));
const generateProductResponse = (product) => {
    const productDto = new productDto_1.default(Object.assign(Object.assign({}, product.toObject()), { id: `${product._id}` }));
    return {
        product: productDto
    };
};
exports.generateProductResponse = generateProductResponse;
const countTotalPrice = (products) => products.reduce((total, product) => total + product.price, 0);
exports.countTotalPrice = countTotalPrice;
//# sourceMappingURL=productServiceHelper.js.map