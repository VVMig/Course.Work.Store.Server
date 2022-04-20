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
const Routes_1 = require("../constants/Routes");
const userController_1 = require("../controllers/userController");
const ApiAdminMiddleware_1 = __importDefault(require("../middlewares/ApiAdminMiddleware"));
const ApiAuthMiddleware_1 = __importDefault(require("../middlewares/ApiAuthMiddleware"));
const router = express.Router();
const userController = new userController_1.UserController();
router.post(Routes_1.Routes.USER_REGISTRATION, userController.registration);
router.post(Routes_1.Routes.USER_LOGIN, userController.login);
router.post(Routes_1.Routes.USER_REFRESH_TOKEN, userController.refreshToken);
router.put(Routes_1.Routes.USER_ROLE, ApiAuthMiddleware_1.default, ApiAdminMiddleware_1.default, userController.changeRole);
router.get(Routes_1.Routes.USER_USERS, ApiAuthMiddleware_1.default, ApiAdminMiddleware_1.default, userController.getUsersList);
router.get(Routes_1.Routes.USER_DATA, ApiAuthMiddleware_1.default, userController.getUserData);
router.get(`${Routes_1.Routes.USER_VERIFICATION}/:id`, userController.verifyUser);
router.get(Routes_1.Routes.USER_GMAIL_AUTH, userController.gmailAuth);
router.get(Routes_1.Routes.USER_GMAIL_AUTH_CALLBACK, userController.gmailAuthCallback);
router.post(Routes_1.Routes.USER_ADD_CART, ApiAuthMiddleware_1.default, userController.addCart);
router.post(Routes_1.Routes.USER_REMOVE_CART, ApiAuthMiddleware_1.default, userController.removeCart);
router.post(Routes_1.Routes.USER_PURCHASE, ApiAuthMiddleware_1.default, userController.purchase);
router.post(Routes_1.Routes.USER_DELETE, ApiAuthMiddleware_1.default, ApiAdminMiddleware_1.default, userController.deleteUsers);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map