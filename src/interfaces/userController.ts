export interface IUserRegistrationBody extends IUserLoginBody {
    firstName?: string;
    lastName?: string;
}

export interface IUserLoginBody {
    email?: string;
    password?: string;
}