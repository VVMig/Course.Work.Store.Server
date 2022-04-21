"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = exports.ApiRoutes = void 0;
var ApiRoutes;
(function (ApiRoutes) {
    ApiRoutes["USER"] = "/api/user";
    ApiRoutes["DOCS"] = "/api-docs";
    ApiRoutes["PRODUCT"] = "/api/product";
})(ApiRoutes = exports.ApiRoutes || (exports.ApiRoutes = {}));
var Routes;
(function (Routes) {
    Routes["USER_REGISTRATION"] = "/registration";
    Routes["USER_LOGIN"] = "/login";
    Routes["USER_DATA"] = "/user";
    Routes["USER_REFRESH_TOKEN"] = "/refresh";
    Routes["USER_VERIFICATION"] = "/verification";
    Routes["USER_GMAIL_AUTH"] = "/gmailAuth";
    Routes["USER_GMAIL_AUTH_CALLBACK"] = "/gmailAuthCallback";
    Routes["USER_ADD_CART"] = "/addCart";
    Routes["USER_ROLE"] = "/role";
    Routes["USER_REMOVE_CART"] = "/removeCart";
    Routes["USER_PURCHASE"] = "/purchase";
    Routes["USER_USERS"] = "/users";
    Routes["USER_DELETE"] = "/delete";
    Routes["PRODUCT_ADD"] = "/add";
    Routes["PRODUCT_REMOVE"] = "/remove";
    Routes["PRODUCT_CATEGORIES"] = "/categories";
    Routes["PRODUCT_PRODUCT"] = "/product";
    Routes["PRODUCT_CATEGORY"] = "/category";
    Routes["PRODUCT_SEARCH"] = "/search";
    Routes["PRODUCT_ALL"] = "/all";
    Routes["PRODUCT_NEW"] = "/new";
    Routes["PRODUCT_EDIT"] = "/edit";
    Routes["PRODUCT_POPULAR"] = "/popular";
})(Routes = exports.Routes || (exports.Routes = {}));
//# sourceMappingURL=Routes.js.map