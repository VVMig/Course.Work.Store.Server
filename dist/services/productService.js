"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorMessages_1 = require("../constants/ErrorMessages");
const api_error_1 = __importDefault(require("../exceptions/api-error"));
const Category_1 = require("../constants/Category");
const Product_1 = require("../models/Product");
const productServiceHelper_1 = require("../helpers/productServiceHelper");
const common_1 = require("../helpers/common");
const imagekit_1 = __importDefault(require("imagekit"));
const uuid_1 = require("uuid");
class ProductService {
    addProduct({ amount, briefInformation, description, images, price, title, commonId, category }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!amount || !price || !title || !category) {
                throw api_error_1.default.BadRequest(ErrorMessages_1.ProductErrorMessages.REQUIRED_FIELDS);
            }
            if (!Object.values(Category_1.Category).includes(category)) {
                throw api_error_1.default.BadRequest(ErrorMessages_1.ProductErrorMessages.INVALID_CATEGORY);
            }
            const imagekit = new imagekit_1.default({
                privateKey: process.env.IMAGERKIT_PRIVATE_KEY,
                publicKey: 'public_f1Hak6ATynuqOpVdiDzKNI6a1pU=',
                urlEndpoint: 'https://ik.imagekit.io/9wyroybev'
            });
            const imagesStore = [];
            for (let imageIndex = 0; imageIndex < images.length; imageIndex++) {
                const res = yield imagekit.upload({
                    file: images[imageIndex],
                    fileName: (0, uuid_1.v4)()
                });
                imagesStore.push({
                    isMain: imageIndex === 0,
                    url: res.thumbnailUrl
                });
            }
            const product = yield Product_1.ProductModel.create({
                price,
                amount,
                briefInformation,
                description,
                title,
                images: imagesStore,
                commonId,
                category
            });
            return (0, productServiceHelper_1.generateProductResponse)(product);
        });
    }
    getProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield Product_1.ProductModel.findById(id);
            if (!product) {
                throw api_error_1.default.BadRequest(ErrorMessages_1.CommonErrorMessages.INVALID_ID);
            }
            return (0, productServiceHelper_1.generateProductResponse)(product);
        });
    }
    getProductsByCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            const categories = (0, common_1.getAllCategories)();
            if (!categories.includes(category)) {
                throw api_error_1.default.BadRequest(ErrorMessages_1.ProductErrorMessages.INVALID_CATEGORY);
            }
            const products = yield Product_1.ProductModel.find({ category });
            if (!ErrorMessages_1.ProductErrorMessages) {
                throw api_error_1.default.BadRequest(ErrorMessages_1.CommonErrorMessages.INVALID_ID);
            }
            return products.map(productServiceHelper_1.generateProductResponse).map(product => (Object.assign({}, product.product)));
        });
    }
    removeProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                throw api_error_1.default.BadRequest(ErrorMessages_1.ProductErrorMessages.REQUIRED_FIELDS);
            }
            const product = yield Product_1.ProductModel.findById(id);
            if (!product) {
                throw api_error_1.default.BadRequest(ErrorMessages_1.CommonErrorMessages.INVALID_ID);
            }
            yield product.delete();
        });
    }
    searchProducts(text) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!text) {
                return [];
            }
            const searchRegex = new RegExp(text, 'i');
            const products = yield Product_1.ProductModel.find({
                title: {
                    $regex: searchRegex
                }
            });
            return products.map(productServiceHelper_1.generateProductResponse).map(product => (Object.assign({}, product.product)));
        });
    }
    newProducts(limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield Product_1.ProductModel.find().sort({ $natural: -1 }).limit(limit);
            return products.map(productServiceHelper_1.generateProductResponse).map(product => (Object.assign({}, product.product)));
        });
    }
}
exports.default = new ProductService();
//# sourceMappingURL=productService.js.map