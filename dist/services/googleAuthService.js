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
const api_error_1 = __importDefault(require("../exceptions/api-error"));
const ErrorMessages_1 = require("../constants/ErrorMessages");
const google_auth_library_1 = require("google-auth-library");
const googleOAuth2_1 = require("../configs/googleOAuth2");
class GoogleAuthService {
    authUser(code) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!code) {
                throw api_error_1.default.BadRequest(ErrorMessages_1.ApiErrorMessages.INTERNAL_ERROR);
            }
            const { tokens } = yield googleOAuth2_1.oauth2Client.getToken(code);
            googleOAuth2_1.oauth2Client.setCredentials(tokens);
            const client = new google_auth_library_1.OAuth2Client(process.env.GMAIL_CLIENT_ID);
            const ticket = yield client.verifyIdToken({
                idToken: tokens.id_token,
                audience: process.env.GMAIL_CLIENT_ID
            });
            const payload = ticket.getPayload();
            return payload;
        });
    }
}
exports.default = new GoogleAuthService();
//# sourceMappingURL=googleAuthService.js.map