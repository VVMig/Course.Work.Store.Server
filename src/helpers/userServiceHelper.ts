import { UserDocument } from "../interfaces/userModel";
import UserDto from '../dtos/userDto';
import tokenService from '../services/tokenService';

export const generateUserResponse = async (user: UserDocument) => {
    const userDto = new UserDto({ ...user.toObject(), id: `${user._id}` });

    const tokens = tokenService.generateTokens({ ...userDto });

    user.token = tokens.accessToken;
    user.refreshToken = tokens.refreshToken;

    await user.save();

    return {
        ...tokens,
        user: userDto
    };
};