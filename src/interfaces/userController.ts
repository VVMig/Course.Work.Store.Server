export interface IUserRegistrationBody extends IUserLoginBody {
    firstName?: string;
    lastName?: string;
}

export interface IUserLoginBody {
    email?: string;
    password?: string;
}

export interface IUserRefreshTokenBody {
    refreshToken?: string;
}

export interface IUserVerificationParams {
    id?: string;
}

export interface IGoogleOAuth2Query {
    code?: string;
}

export interface ICartAddBody {
    id?: string;
}

export interface IPurchaseBody extends ICartAddBody {
    amount?: number;
    address?: string;
    commentary?: string;
    tel?: string;
}