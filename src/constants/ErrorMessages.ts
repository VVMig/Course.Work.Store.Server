export enum ApiErrorMessages {
    UNAUTHORIZED = 'User is unauthorized',
    INTERNAL_ERROR = 'Something went wrong',
    ACCESS_DENIED = 'You do not have permission to access this resource'
}

export enum UserErrorMessages {
    REQUIRED_PASSWORD_EMAIL = 'Please specify your password and email',
    EMAIL_EXIST = 'User with that email already exist',
    REQUIRED_NAME = 'Please specify your name',
    WRONG_DATA = 'Please enter your correct email or password',
    WRONG_VERIFICATION_LINK = 'Link is incorrect'
}