import { IUserDTO } from '../interfaces/dtos';
import jwt from 'jsonwebtoken';

class TokenService {
    generateTokens(payload: IUserDTO) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '24h' });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });

        return {
            accessToken,
            refreshToken
        };
    }
}

export default new TokenService();