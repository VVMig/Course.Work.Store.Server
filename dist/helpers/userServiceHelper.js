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
exports.generateUserResponse = void 0;
const userDto_1 = __importDefault(require("../dtos/userDto"));
const tokenService_1 = __importDefault(require("../services/tokenService"));
const generateUserResponse = (user, withToken = true) => __awaiter(void 0, void 0, void 0, function* () {
    const userDto = new userDto_1.default(Object.assign(Object.assign({}, user.toObject()), { cart: user.cart, id: `${user._id}` }));
    let tokens;
    if (withToken) {
        tokens = tokenService_1.default.generateTokens(Object.assign({}, userDto));
        user.token = tokens.accessToken;
        user.refreshToken = tokens.refreshToken;
    }
    yield user.save();
    return tokens ? Object.assign(Object.assign({}, tokens), { user: userDto }) : {
        user: userDto
    };
});
exports.generateUserResponse = generateUserResponse;
//# sourceMappingURL=userServiceHelper.js.map