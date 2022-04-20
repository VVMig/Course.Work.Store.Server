"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const productServiceHelper_1 = require("../helpers/productServiceHelper");
const googleapis_1 = require("googleapis");
const nodemailer = __importStar(require("nodemailer"));
const createTransporter = () => __awaiter(void 0, void 0, void 0, function* () {
    const oauth2Client = new googleapis_1.google.auth.OAuth2(process.env.OAUTH_CLIENT_ID, process.env.OAUTH_CLIENT_SECRET, "https://developers.google.com/oauthplayground");
    oauth2Client.setCredentials({
        refresh_token: process.env.OAUTH_REFRESH_TOKEN
    });
    const accessToken = yield new Promise((resolve, reject) => {
        oauth2Client.getAccessToken((err, token) => {
            if (err) {
                reject("Failed to create access token :(");
            }
            resolve(token);
        });
    });
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: "OAuth2",
            user: process.env.SMTP_USER,
            accessToken,
            clientId: process.env.OAUTH_CLIENT_ID,
            clientSecret: process.env.OAUTH_CLIENT_SECRET,
            refreshToken: process.env.OAUTH_REFRESH_TOKEN
        }
    });
    return transporter;
});
class MailService {
    sendVerificationMail(to, link) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(process.env.SMTP_PORT, process.env.SMTP_HOST, process.env.SMTP_USER, process.env.SMTP_PASSWORD, process.env.NODE_ENV, process.env.NODE_ENV == 'production', process.env.OAUTH_CLIENT_ID);
            const transporter = yield createTransporter();
            yield transporter.sendMail({
                from: "Course Work",
                to,
                subject: "Account verification",
                html: `
                <a href="${link}">Activation link</a>
            `,
            });
        });
    }
    sendTransactionMail(to, user, products, address, tel, commentary, amount, paymentMethod) {
        return __awaiter(this, void 0, void 0, function* () {
            const transporter = yield createTransporter();
            yield transporter.sendMail({
                from: "Course Work",
                to,
                subject: `Transaction ${user.email}.`,
                html: `<h1>User: ${user.firstName} ${user.lastName}</h1>
            <h2>Address: ${address}</h2>
            <h2>Tel: ${tel}</h2>
            ${commentary ? `<h2>Commentary: ${commentary}</h2>` : ""}
            <h2>Payment method: ${paymentMethod}</h2>
            <h2>Products:</h2> <br/>
            ${products.reduce((htmlMail, product) => htmlMail +
                    `
                <h2>Amount: ${amount}</h2>
                <h2>Product: ${product === null || product === void 0 ? void 0 : product.title}</h2>
                <h2>Price: ${(product === null || product === void 0 ? void 0 : product.price) * amount}$</h2>
                <hr />
            `, "")}
            <h2>Total price: ${(0, productServiceHelper_1.countTotalPrice)(products)}$</h2>`,
            });
        });
    }
}
exports.default = new MailService();
//# sourceMappingURL=mailService.js.map