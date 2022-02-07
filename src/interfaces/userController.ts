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