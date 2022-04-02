import { IProduct } from "interfaces/productModel";
import { IUserDTO } from "../interfaces/dtos";
import { UserRoles } from "constants/Roles";

export default class UserDto implements IUserDTO {
    email: string;
    firstName: string;
    lastName: string;
    id: string;
    isVerified: boolean;
    role: UserRoles;
    cart: IProduct[];

    constructor({ email, firstName, lastName, id, isVerified, role, cart }: IUserDTO) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.id = id;
        this.isVerified = isVerified;
        this.role = role;
        this.cart = cart;
    }
}