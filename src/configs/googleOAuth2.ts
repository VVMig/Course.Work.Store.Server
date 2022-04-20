import { ApiRoutes, Routes } from "../constants/Routes";
import { google } from "googleapis";

const oauth2Client = new google.auth.OAuth2({
    clientId: process.env.GMAIL_CLIENT_ID || '8183718671-14dctcgoatjr0v072d46k0e6roohjuvi.apps.googleusercontent.com',
    clientSecret: process.env.GMAIL_CLIENT_SECRET || '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',
    redirectUri: process.env.SERVER_URL ? `${process.env.SERVER_URL}${ApiRoutes.USER}${Routes.USER_GMAIL_AUTH_CALLBACK}` : 'https://vvmig-server-bsu.herokuapp.com/api/user/gmailAuthCallback'
});

google.options({
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

export {
    oauth2Client,
    googleAuthUrl
};