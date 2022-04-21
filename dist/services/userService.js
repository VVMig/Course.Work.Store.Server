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
const Routes_1 = require("../constants/Routes");
const api_error_1 = __importDefault(require("../exceptions/api-error"));
const ErrorMessages_1 = require("../constants/ErrorMessages");
const User_1 = require("../models/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userServiceHelper_1 = require("../helpers/userServiceHelper");
const googleAuthService_1 = __importDefault(require("./googleAuthService"));
const mailService_1 = __importDefault(require("./mailService"));
const tokenService_1 = __importDefault(require("./tokenService"));
const uuid_1 = require("uuid");
const Product_1 = require("../models/Product");
const Roles_1 = require("../constants/Roles");
const productServiceHelper_1 = require("../helpers/productServiceHelper");
class UserService {
    registration(email, password, firstName, lastName) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!email || !password) {
                throw api_error_1.default.BadRequest(ErrorMessages_1.UserErrorMessages.REQUIRED_PASSWORD_EMAIL);
            }
            const candidate = yield User_1.UserModel.findOne({ email });
            if (candidate) {
                throw api_error_1.default.BadRequest(ErrorMessages_1.UserErrorMessages.EMAIL_EXIST);
            }
            if (!firstName || !lastName) {
                throw api_error_1.default.BadRequest(ErrorMessages_1.UserErrorMessages.REQUIRED_NAME);
            }
            const hashPassword = yield bcrypt_1.default.hash(password, 3);
            const verificationId = (0, uuid_1.v4)();
            const verifiedUrl = `${process.env.SERVER_URL}${Routes_1.ApiRoutes.USER}${Routes_1.Routes.USER_VERIFICATION}/${verificationId}`;
            yield mailService_1.default.sendVerificationMail(email, verifiedUrl, `${firstName} ${lastName}`);
            const user = yield User_1.UserModel.create({
                email,
                password: hashPassword,
                firstName,
                lastName,
                verifiedUrl: verificationId
            });
            const response = yield (0, userServiceHelper_1.generateUserResponse)(user);
            return response;
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!email || !password) {
                throw api_error_1.default.BadRequest(ErrorMessages_1.UserErrorMessages.REQUIRED_PASSWORD_EMAIL);
            }
            const user = yield User_1.UserModel.findOne({ email }).populate('cart');
            if (!user) {
                throw api_error_1.default.BadRequest(ErrorMessages_1.UserErrorMessages.WRONG_DATA);
            }
            if (!user.password) {
                throw api_error_1.default.BadRequest(ErrorMessages_1.UserErrorMessages.WRONG_DATA);
            }
            const isPassCorrect = yield bcrypt_1.default.compare(password, user.password);
            if (!isPassCorrect) {
                throw api_error_1.default.BadRequest(ErrorMessages_1.UserErrorMessages.WRONG_DATA);
            }
            const response = yield (0, userServiceHelper_1.generateUserResponse)(user);
            return response;
        });
    }
    googleLogin(code) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, given_name, family_name } = yield googleAuthService_1.default.authUser(code);
            let user = yield User_1.UserModel.findOne({ email }).populate('cart');
            if (!user) {
                user = yield User_1.UserModel.create({
                    email,
                    isVerified: true,
                    firstName: given_name,
                    lastName: family_name
                });
            }
            if (!user.isVerified) {
                user.isVerified = true;
            }
            const response = yield (0, userServiceHelper_1.generateUserResponse)(user);
            return response;
        });
    }
    isAuthUser(id, accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_1.UserModel.findOne({ _id: id, token: accessToken });
                return !!user;
            }
            catch (error) {
                return false;
            }
        });
    }
    refreshToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!refreshToken) {
                throw api_error_1.default.UnauthorizedError();
            }
            const userData = tokenService_1.default.validateRefreshToken(refreshToken);
            if (!userData) {
                throw api_error_1.default.UnauthorizedError();
            }
            const user = yield User_1.UserModel.findOne({ _id: userData.id, refreshToken });
            if (!user) {
                throw api_error_1.default.UnauthorizedError();
            }
            const response = yield (0, userServiceHelper_1.generateUserResponse)(user);
            return response;
        });
    }
    getUserData(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.UserModel.findOne({ _id }).populate('cart');
            const userDto = yield (0, userServiceHelper_1.generateUserResponse)(user, false);
            return userDto.user;
        });
    }
    verifyUser(verifiedUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!verifiedUrl) {
                return false;
            }
            const user = yield User_1.UserModel.findOne({ verifiedUrl });
            if (!user) {
                return false;
            }
            user.isVerified = true;
            yield user.save();
            return true;
        });
    }
    deleteUsers(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let index = 0; index < ids.length; index++) {
                const user = yield User_1.UserModel.findById(ids[index]);
                if (!user) {
                    throw api_error_1.default.BadRequest(ErrorMessages_1.CommonErrorMessages.INVALID_ID);
                }
                yield user.delete();
            }
            return ids;
        });
    }
    addCart(userId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                throw api_error_1.default.BadRequest(ErrorMessages_1.CommonErrorMessages.INVALID_ID);
            }
            const user = yield User_1.UserModel.findById(userId).populate('cart');
            const product = yield Product_1.ProductModel.findById(id);
            if (!product) {
                throw api_error_1.default.BadRequest(ErrorMessages_1.CommonErrorMessages.INVALID_ID);
            }
            if (user.cart.some(item => `${item._id}` === id)) {
                throw api_error_1.default.BadRequest(ErrorMessages_1.UserErrorMessages.ALREADY_IN_CART);
            }
            user.cart.push(product);
            yield user.save();
            return user.cart;
        });
    }
    removeCart(userId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                throw api_error_1.default.BadRequest(ErrorMessages_1.CommonErrorMessages.INVALID_ID);
            }
            const user = yield User_1.UserModel.findById(userId).populate('cart');
            const product = yield Product_1.ProductModel.findById(id);
            if (!product) {
                throw api_error_1.default.BadRequest(ErrorMessages_1.CommonErrorMessages.INVALID_ID);
            }
            const productIndex = user.cart.findIndex(item => `${item._id}` === id);
            if (productIndex < 0) {
                return user.cart;
            }
            user.cart.splice(productIndex, 1);
            yield user.save();
            return user.cart;
        });
    }
    purchase(userId, ids, address, amount, commentary, tel, paymentMethod) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!ids) {
                throw api_error_1.default.BadRequest(ErrorMessages_1.CommonErrorMessages.INVALID_ID);
            }
            if (!tel) {
                throw api_error_1.default.BadRequest(ErrorMessages_1.UserErrorMessages.ENTER_TEL);
            }
            if (!address) {
                throw api_error_1.default.BadRequest(ErrorMessages_1.UserErrorMessages.ENTER_ADDRESS);
            }
            if (!paymentMethod) {
                throw api_error_1.default.BadRequest(ErrorMessages_1.UserErrorMessages.PAYMENT_METHOD);
            }
            const user = yield User_1.UserModel.findById(userId);
            const productDtos = [];
            yield Promise.all(ids.map((id) => __awaiter(this, void 0, void 0, function* () {
                const product = yield Product_1.ProductModel.findById(id);
                if (!product) {
                    throw api_error_1.default.BadRequest(ErrorMessages_1.CommonErrorMessages.INVALID_ID);
                }
                product.transactionsAmount = product.transactionsAmount + amount;
                const { product: productDto } = (0, productServiceHelper_1.generateProductResponse)(product);
                productDtos.push(productDto);
                product.amount = product.amount - amount;
                yield product.save();
            })));
            let cart = [];
            for (let index = 0; index < ids.length; index++) {
                cart = yield this.removeCart(userId, ids[index]);
            }
            const admin = yield User_1.UserModel.findOne({ role: Roles_1.UserRoles.ADMIN });
            if (!admin) {
                throw api_error_1.default.BadRequest(ErrorMessages_1.CommonErrorMessages.ADMIN_REQUIRED);
            }
            const userDto = yield (0, userServiceHelper_1.generateUserResponse)(user, false);
            yield mailService_1.default.sendTransactionMail(admin.email, userDto.user, productDtos, address, tel, commentary, amount, paymentMethod);
            return cart;
        });
    }
    changeRole(userIds, role) {
        return __awaiter(this, void 0, void 0, function* () {
            const usersResponse = [];
            for (let index = 0; index < userIds.length; index++) {
                const user = yield User_1.UserModel.findById(userIds[index]);
                if (!user) {
                    throw api_error_1.default.BadRequest(ErrorMessages_1.CommonErrorMessages.INVALID_ID);
                }
                user.role = role;
                yield user.save();
                const userResponse = (yield (0, userServiceHelper_1.generateUserResponse)(user, false)).user;
                usersResponse.push(userResponse);
            }
            return usersResponse;
        });
    }
    getUsersList(page) {
        return __awaiter(this, void 0, void 0, function* () {
            const usersPerPage = 10;
            const allUsersAmount = yield User_1.UserModel.count();
            const users = yield User_1.UserModel.find().sort({ _id: 1 }).skip(page > 0 ? ((page - 1) * usersPerPage) : 0).limit(usersPerPage);
            const mappedUsers = (yield Promise.all(users.map(user => (0, userServiceHelper_1.generateUserResponse)(user, false)))).map(user => user.user);
            return {
                users: mappedUsers,
                totalCounts: allUsersAmount
            };
        });
    }
}
exports.default = new UserService();
//# sourceMappingURL=userService.js.map