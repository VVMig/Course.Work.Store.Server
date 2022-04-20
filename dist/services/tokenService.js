"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class TokenService {
    generateTokens(payload) {
        const accessToken = jsonwebtoken_1.default.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '24h' });
        const refreshToken = jsonwebtoken_1.default.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
        return {
            accessToken,
            refreshToken
        };
    }
    validateToken(accessToken) {
        try {
            const userData = jsonwebtoken_1.default.verify(accessToken, process.env.JWT_ACCESS_SECRET);
            return userData;
        }
        catch (error) {
            return null;
        }
    }
    validateRefreshToken(refreshToken) {
        try {
            const userData = jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
            return userData;
        }
        catch (error) {
            return null;
        }
    }
}
exports.default = new TokenService();
//# sourceMappingURL=tokenService.js.map