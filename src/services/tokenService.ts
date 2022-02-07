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

    validateToken(accessToken: string) {
        try {
            const userData = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);

            return userData as IUserDTO;
        } catch (error) {
            return null;
        }
    }

    validateRefreshToken(refreshToken: string) {
        try {
            const userData = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

            return userData as IUserDTO;
        } catch (error) {
            return null;
        }
    }
}

export default new TokenService();