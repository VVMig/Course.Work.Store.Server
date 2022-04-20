"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorMessages_1 = require("../constants/ErrorMessages");
const StatusCodes_1 = require("../constants/StatusCodes");
class ApiError extends Error {
    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }
    static UnauthorizedError() {
        return new ApiError(StatusCodes_1.StatusCodes.UNAUTHORIZED, ErrorMessages_1.ApiErrorMessages.UNAUTHORIZED);
    }
    static BadRequest(message, errors = []) {
        return new ApiError(StatusCodes_1.StatusCodes.BAD_REQUEST, message, errors);
    }
    static PermissionError() {
        return new ApiError(StatusCodes_1.StatusCodes.ACCESS_DENIED, ErrorMessages_1.ApiErrorMessages.ACCESS_DENIED);
    }
}
exports.default = ApiError;
//# sourceMappingURL=api-error.js.map