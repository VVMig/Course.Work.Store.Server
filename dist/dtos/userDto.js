"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserDto {
    constructor({ email, firstName, lastName, id, isVerified, role, cart }) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.id = id;
        this.isVerified = isVerified;
        this.role = role;
        this.cart = cart;
    }
}
exports.default = UserDto;
//# sourceMappingURL=userDto.js.map