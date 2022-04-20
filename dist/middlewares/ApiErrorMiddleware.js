"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_error_1 = __importDefault(require("../exceptions/api-error"));
const ErrorMessages_1 = require("../constants/ErrorMessages");
const StatusCodes_1 = require("../constants/StatusCodes");
// eslint-disable-next-line @typescript-eslint/no-unused-vars
exports.default = (err, _req, res, _next) => {
    console.log(err);
    if (err instanceof api_error_1.default) {
        return res.status(err.status).json({
            message: err.message,
            errors: err.errors
        });
    }
    return res.status(StatusCodes_1.StatusCodes.INTERNAL_ERROR).json({
        message: ErrorMessages_1.ApiErrorMessages.INTERNAL_ERROR,
        error: err
    });
};
//# sourceMappingURL=ApiErrorMiddleware.js.map