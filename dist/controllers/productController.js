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
exports.ProductController = void 0;
const StatusCodes_1 = require("../constants/StatusCodes");
const common_1 = require("../helpers/common");
const productService_1 = __importDefault(require("../services/productService"));
class ProductController {
    addProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { amount, briefInformation, description, images, price, title, commonId, category } = req.body;
                const product = yield productService_1.default.addProduct({
                    amount,
                    briefInformation,
                    description,
                    images,
                    price,
                    title,
                    commonId,
                    category
                });
                res.json(product);
            }
            catch (error) {
                next(error);
            }
        });
    }
    removeProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.body;
                yield productService_1.default.removeProduct(id);
                res.status(StatusCodes_1.StatusCodes.SUCCESS).json();
            }
            catch (error) {
                next(error);
            }
        });
    }
    getCategories(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.json({
                    categories: (0, common_1.getAllCategories)()
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    getProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.query;
                const product = yield productService_1.default.getProduct(id);
                res.json(product);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getProductsByCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { category } = req.query;
                const products = yield productService_1.default.getProductsByCategory(category);
                res.json(products);
            }
            catch (error) {
                next(error);
            }
        });
    }
    searchProducts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { text } = req.query;
                const products = yield productService_1.default.searchProducts(text);
                res.json(products);
            }
            catch (error) {
                next(error);
            }
        });
    }
    newProducts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { limit } = req.query;
                const products = yield productService_1.default.newProducts(+limit);
                res.json(products);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.ProductController = ProductController;
//# sourceMappingURL=productController.js.map