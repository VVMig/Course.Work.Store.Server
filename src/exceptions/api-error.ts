import { ApiErrorMessages } from "../constants/ErrorMessages";
import { StatusCodes } from "../constants/StatusCodes";

export default class ApiError extends Error {
    public status?: number;
    public errors?: any[];

    constructor(status: number, message: string, errors: any[] = []) {
        super(message);

        this.status = status;
        this.errors = errors;
    }

    static UnauthorizedError() {
        return new ApiError(StatusCodes.UNAUTHORIZED, ApiErrorMessages.UNAUTHORIZED);
    }

    static BadRequest(message: string, errors: any[] = []) {
        return new ApiError(StatusCodes.BAD_REQUEST, message, errors);
    }

    static PermissionError() {
        return new ApiError(StatusCodes.ACCESS_DENIED, ApiErrorMessages.ACCESS_DENIED);
    }
}
