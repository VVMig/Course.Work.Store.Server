import ApiError from '../exceptions/api-error';
import { ApiErrorMessages } from '../constants/ErrorMessages';
import { OAuth2Client } from 'google-auth-library';
import { oauth2Client } from '../configs/googleOAuth2';

class GoogleAuthService {
    async authUser(code?: string) {
        if (!code) {
            throw ApiError.BadRequest(ApiErrorMessages.INTERNAL_ERROR);
        }

        const { tokens } = await oauth2Client.getToken(code);

        oauth2Client.setCredentials(tokens);

        const client = new OAuth2Client(process.env.GMAIL_CLIENT_ID);

        const ticket = await client.verifyIdToken({
            idToken: tokens.id_token,
            audience: process.env.GMAIL_CLIENT_ID
        });

        const payload = ticket.getPayload();

        return payload;
    }
}

export default new GoogleAuthService();