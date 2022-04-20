"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const productController_1 = require("../controllers/productController");
const Routes_1 = require("../constants/Routes");
const ApiAdminMiddleware_1 = __importDefault(require("../middlewares/ApiAdminMiddleware"));
const ApiAuthMiddleware_1 = __importDefault(require("../middlewares/ApiAuthMiddleware"));
const router = express.Router();
const productController = new productController_1.ProductController();
router.post(Routes_1.Routes.PRODUCT_ADD, ApiAuthMiddleware_1.default, ApiAdminMiddleware_1.default, productController.addProduct);
router.post(Routes_1.Routes.PRODUCT_REMOVE, ApiAuthMiddleware_1.default, ApiAdminMiddleware_1.default, productController.removeProduct);
router.get(Routes_1.Routes.PRODUCT_CATEGORIES, productController.getCategories);
router.get(Routes_1.Routes.PRODUCT_PRODUCT, productController.getProduct);
router.get(Routes_1.Routes.PRODUCT_CATEGORY, productController.getProductsByCategory);
router.get(Routes_1.Routes.PRODUCT_SEARCH, productController.searchProducts);
router.get(Routes_1.Routes.PRODUCT_NEW, productController.newProducts);
exports.default = router;
//# sourceMappingURL=productRoutes.js.map