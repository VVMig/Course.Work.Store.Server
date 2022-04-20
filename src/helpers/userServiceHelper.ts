import { UserDocument } from "../interfaces/userModel";
import UserDto from '../dtos/userDto';
import tokenService from '../services/tokenService';

export const generateUserResponse = async (user: UserDocument, withToken = true) => {
    const userDto = new UserDto({ ...user.toObject(), cart: user.cart, id: `${user._id}` });
    let tokens;

    if(withToken) {
        tokens = tokenService.generateTokens({ ...userDto });

        user.token = tokens.accessToken;
        user.refreshToken = tokens.refreshToken;
    }

    await user.save();

    return tokens ? {
        ...tokens,
        user: userDto
    } : {
        user: userDto
    };
};