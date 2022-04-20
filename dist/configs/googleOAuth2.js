"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleAuthUrl = exports.oauth2Client = void 0;
const Routes_1 = require("../constants/Routes");
const googleapis_1 = require("googleapis");
const oauth2Client = new googleapis_1.google.auth.OAuth2({
    clientId: process.env.GMAIL_CLIENT_ID || '8183718671-14dctcgoatjr0v072d46k0e6roohjuvi.apps.googleusercontent.com',
    clientSecret: process.env.GMAIL_CLIENT_SECRET || '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',
    redirectUri: process.env.SERVER_URL ? `${process.env.SERVER_URL}${Routes_1.ApiRoutes.USER}${Routes_1.Routes.USER_GMAIL_AUTH_CALLBACK}` : 'http://localhost:3000/api/user/gmailAuthCallback'
});
exports.oauth2Client = oauth2Client;
googleapis_1.google.options({
    auth: oauth2Client
});
const scopes = [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email'
];
const googleAuthUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes.join(' ')
});
exports.googleAuthUrl = googleAuthUrl;
//# sourceMappingURL=googleOAuth2.js.map