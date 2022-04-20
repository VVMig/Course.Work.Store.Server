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
exports.UserController = void 0;
const googleOAuth2_1 = require("../configs/googleOAuth2");
const userService_1 = __importDefault(require("../services/userService"));
class UserController {
    registration(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password, firstName, lastName } = req.body;
                const user = yield userService_1.default.registration(email, password, firstName, lastName);
                return res.json(user);
            }
            catch (error) {
                next(error);
            }
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = yield userService_1.default.login(email, password);
                return res.json(user);
            }
            catch (error) {
                next(error);
            }
        });
    }
    refreshToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { refreshToken } = req.body;
                const user = yield userService_1.default.refreshToken(refreshToken);
                return res.json(user);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getUserData(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = req.user;
                const user = yield userService_1.default.getUserData(userData.id);
                return res.json(user);
            }
            catch (error) {
                next(error);
            }
        });
    }
    verifyUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const isVerificationSuccess = yield userService_1.default.verifyUser(id);
                if (isVerificationSuccess) {
                    res.redirect(process.env.CLIENT_VERIFICATION_URL_SUCCESS);
                }
                else {
                    res.redirect(process.env.CLIENT_VERIFICATION_URL_ERROR);
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    gmailAuth(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.redirect(googleOAuth2_1.googleAuthUrl);
            }
            catch (error) {
                next(error);
            }
        });
    }
    gmailAuthCallback(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userService_1.default.googleLogin(req.query.code);
                res.redirect(`${process.env.CLIENT_URL}?credentials=${JSON.stringify(user)}`);
            }
            catch (error) {
                next(error);
            }
        });
    }
    addCart(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cart = yield userService_1.default.addCart(req.user.id, req.body.id);
                res.json({
                    cart
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    removeCart(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cart = yield userService_1.default.removeCart(req.user.id, req.body.id);
                res.json({
                    cart
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    purchase(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { address, amount, commentary, ids, tel, paymentMethod } = req.body;
                const cart = yield userService_1.default.purchase(req.user.id, ids, address, amount, commentary, tel, paymentMethod);
                res.json(cart);
            }
            catch (error) {
                next(error);
            }
        });
    }
    changeRole(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { role, userIds } = req.body;
                const users = yield userService_1.default.changeRole(userIds, role);
                res.json(users);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getUsersList(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { page } = req.query;
                const listResponse = yield userService_1.default.getUsersList((_a = +page) !== null && _a !== void 0 ? _a : 1);
                res.json(listResponse);
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userIds } = req.body;
                const deletedIds = yield userService_1.default.deleteUsers(userIds);
                res.json(deletedIds);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=userController.js.map