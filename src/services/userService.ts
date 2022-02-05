import ApiError from '../exceptions/api-error';
import { UserErrorMessages } from "../constants/ErrorMessages";
import { UserModel } from "../models/User";
import bcrypt from 'bcrypt';
import { generateUserResponse } from '../helpers/userServiceHelper';

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

        const user = await UserModel.create({
            email,
            password: hashPassword,
            firstName,
            lastName
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
}

export default new UserService();
