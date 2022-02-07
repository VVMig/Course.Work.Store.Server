import { ApiRoutes, Routes } from '../constants/routes';
import ApiError from '../exceptions/api-error';
import UserDto from '../dtos/userDto';
import { UserErrorMessages } from "../constants/ErrorMessages";
import { UserModel } from "../models/User";
import bcrypt from 'bcrypt';
import { generateUserResponse } from '../helpers/userServiceHelper';
import googleAuthService from './googleAuthService';
import mailService from './mailService';
import tokenService from './tokenService';
import { v4 as uuid_v4 } from "uuid";

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

        const user = await UserModel.findOne({ email });

        if (!user) {
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

        let user = await UserModel.findOne({ email });

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
        const user = await UserModel.findOne({ _id });

        const userDto = new UserDto({ ...user.toObject(), id: `${user._id}` });

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
}

export default new UserService();
