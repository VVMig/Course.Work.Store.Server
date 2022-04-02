import { ApiRoutes, Routes } from '../constants/Routes';
import ApiError from '../exceptions/api-error';
import { CommonErrorMessages, UserErrorMessages } from "../constants/ErrorMessages";
import UserDto from '../dtos/userDto';
import { UserModel } from "../models/User";
import bcrypt from 'bcrypt';
import { generateUserResponse } from '../helpers/userServiceHelper';
import googleAuthService from './googleAuthService';
import mailService from './mailService';
import tokenService from './tokenService';
import { v4 as uuid_v4 } from "uuid";
import { ProductModel } from '../models/Product';
import { UserRoles } from '../constants/Roles';
import { generateProductResponse } from '../helpers/productServiceHelper';

class UserService {
    async registration(email?: string, password?: string, firstName?: string, lastName?: string) {
        if (!email || !password) {
            throw ApiError.BadRequest(UserErrorMessages.REQUIRED_PASSWORD_EMAIL);
        }

        const candidate = await UserModel.findOne({ email });

        if (candidate) {
            throw ApiError.BadRequest(UserErrorMessages.EMAIL_EXIST);
        }

        if (!firstName || !lastName) {
            throw ApiError.BadRequest(UserErrorMessages.REQUIRED_NAME);
        }

        const hashPassword = await bcrypt.hash(password, 3);

        const verificationId = uuid_v4();

        const verifiedUrl = `${process.env.URL}${ApiRoutes.USER}${Routes.USER_VERIFICATION}/${verificationId}`;

        await mailService.sendVerificationMail(email, verifiedUrl);

        const user = await UserModel.create({
            email,
            password: hashPassword,
            firstName,
            lastName,
            verifiedUrl: verificationId
        });

        const response = await generateUserResponse(user);

        return response;
    }

    async login(email?: string, password?: string) {
        if (!email || !password) {
            throw ApiError.BadRequest(UserErrorMessages.REQUIRED_PASSWORD_EMAIL);
        }

        const user = await UserModel.findOne({ email }).populate('cart');

        if (!user) {
            throw ApiError.BadRequest(UserErrorMessages.WRONG_DATA);
        }

        if (!user.password) {
            throw ApiError.BadRequest(UserErrorMessages.WRONG_DATA);
        }

        const isPassCorrect = await bcrypt.compare(password, user.password);

        if (!isPassCorrect) {
            throw ApiError.BadRequest(UserErrorMessages.WRONG_DATA);
        }

        const response = await generateUserResponse(user);

        return response;
    }

    async googleLogin(code?: string) {
        const { email, given_name, family_name } = await googleAuthService.authUser(code);

        let user = await UserModel.findOne({ email }).populate('cart');

        if (!user) {
            user = await UserModel.create({
                email,
                isVerified: true,
                firstName: given_name,
                lastName: family_name
            });
        }

        const response = await generateUserResponse(user);

        return response;
    }

    async isAuthUser(id: string, accessToken: string) {
        try {
            const user = await UserModel.findOne({ _id: id, token: accessToken });

            return !!user;
        } catch (error) {
            return false;
        }
    }

    async refreshToken(refreshToken?: string) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }

        const userData = tokenService.validateRefreshToken(refreshToken);

        if (!userData) {
            throw ApiError.UnauthorizedError();
        }

        const user = await UserModel.findOne({ _id: userData.id, refreshToken });

        if (!user) {
            throw ApiError.UnauthorizedError();
        }

        const response = await generateUserResponse(user);

        return response;
    }

    async getUserData(_id: string) {
        const user = await UserModel.findOne({ _id }).populate('cart');

        const userDto = new UserDto({ ...user.toObject(), cart: user.cart, id: `${user._id}` });

        return userDto;
    }

    async verifyUser(verifiedUrl?: string) {
        if (!verifiedUrl) {
            return false;
        }

        const user = await UserModel.findOne({ verifiedUrl });

        if (!user) {
            return false;
        }

        user.isVerified = true;

        await user.save();

        return true;
    }

    async addCart(userId: string, id?: string) {
        if (!id) {
            throw ApiError.BadRequest(CommonErrorMessages.INVALID_ID);
        }

        const user = await UserModel.findById(userId).populate('cart');

        const product = await ProductModel.findById(id);

        if (!product) {
            throw ApiError.BadRequest(CommonErrorMessages.INVALID_ID);
        }

        if (user.cart.some(item => `${item._id}` === id)) {
            throw ApiError.BadRequest(UserErrorMessages.ALREADY_IN_CART);
        }

        user.cart.push(product);

        await user.save();

        return user.cart;
    }

    async removeCart(userId: string, id?: string) {
        if (!id) {
            throw ApiError.BadRequest(CommonErrorMessages.INVALID_ID);
        }

        const user = await UserModel.findById(userId).populate('cart');

        const product = await ProductModel.findById(id);

        if (!product) {
            throw ApiError.BadRequest(CommonErrorMessages.INVALID_ID);
        }

        const productIndex = user.cart.findIndex(item => `${item._id}` === id);

        if (productIndex < 0) {
            return user.cart;
        }

        user.cart.splice(productIndex, 1);

        await user.save();

        return user.cart;
    }

    async purchase(userId: string, id?: string, address?: string, amount?: number, commentary?: string, tel?: string) {
        if (!id) {
            throw ApiError.BadRequest(CommonErrorMessages.INVALID_ID);
        }

        if (!tel) {
            throw ApiError.BadRequest(UserErrorMessages.ENTER_TEL);
        }

        if (!address) {
            throw ApiError.BadRequest(UserErrorMessages.ENTER_ADDRESS);
        }

        const user = await UserModel.findById(userId);
        const product = await ProductModel.findById(id);

        if (!product) {
            throw ApiError.BadRequest(CommonErrorMessages.INVALID_ID);
        }

        const admin = await UserModel.findOne({ role: UserRoles.ADMIN });

        if (!admin) {
            throw ApiError.BadRequest(CommonErrorMessages.ADMIN_REQUIRED);
        }

        const userDto = new UserDto({ ...user.toObject(), cart: user.cart, id: `${user._id}` });
        const { product: productDto } = await generateProductResponse(product);

        await mailService.sendTransactionMail(admin.email, userDto, productDto, address, tel, commentary, amount);

        product.amount = product.amount - 1;

        await product.save();

        const cart = await this.removeCart(userId, id);

        return cart;
    }
}

export default new UserService();
