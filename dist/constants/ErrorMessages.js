"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductErrorMessages = exports.UserErrorMessages = exports.CommonErrorMessages = exports.ApiErrorMessages = void 0;
var ApiErrorMessages;
(function (ApiErrorMessages) {
    ApiErrorMessages["UNAUTHORIZED"] = "User is unauthorized";
    ApiErrorMessages["INTERNAL_ERROR"] = "Something went wrong";
    ApiErrorMessages["ACCESS_DENIED"] = "You do not have permission to access this resource";
})(ApiErrorMessages = exports.ApiErrorMessages || (exports.ApiErrorMessages = {}));
var CommonErrorMessages;
(function (CommonErrorMessages) {
    CommonErrorMessages["INVALID_ID"] = "Invalid id";
    CommonErrorMessages["ADMIN_REQUIRED"] = "Admin is required";
})(CommonErrorMessages = exports.CommonErrorMessages || (exports.CommonErrorMessages = {}));
var UserErrorMessages;
(function (UserErrorMessages) {
    UserErrorMessages["REQUIRED_PASSWORD_EMAIL"] = "Please specify your password and email";
    UserErrorMessages["EMAIL_EXIST"] = "User with that email already exist";
    UserErrorMessages["REQUIRED_NAME"] = "Please specify your name";
    UserErrorMessages["WRONG_DATA"] = "Please enter your correct email or password";
    UserErrorMessages["WRONG_VERIFICATION_LINK"] = "Link is incorrect";
    UserErrorMessages["ALREADY_IN_CART"] = "You have already added this product to the cart";
    UserErrorMessages["ENTER_TEL"] = "Mobile number is required";
    UserErrorMessages["ENTER_ADDRESS"] = "Address is required";
    UserErrorMessages["PAYMENT_METHOD"] = "Select payment method";
})(UserErrorMessages = exports.UserErrorMessages || (exports.UserErrorMessages = {}));
var ProductErrorMessages;
(function (ProductErrorMessages) {
    ProductErrorMessages["REQUIRED_FIELDS"] = "Fill all required fields";
    ProductErrorMessages["INVALID_CATEGORY"] = "Invalid category";
})(ProductErrorMessages = exports.ProductErrorMessages || (exports.ProductErrorMessages = {}));
//# sourceMappingURL=ErrorMessages.js.map