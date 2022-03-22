import { IUserDTO } from "../interfaces/dtos";
import { UserRoles } from "constants/Roles";

export default class UserDto implements IUserDTO {
    email: string;
    firstName: string;
    lastName: string;
    id: string;
    isVerified: boolean;
    role: UserRoles;

    constructor({ email, firstName, lastName, id, isVerified, role }: IUserDTO) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.id = id;
        this.isVerified = isVerified;
        this.role = role;
    }
}