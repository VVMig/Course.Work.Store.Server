import { IUserDTO } from "../interfaces/dtos";

export default class UserDto implements IUserDTO {
    email: string;
    firstName: string;
    lastName: string;
    id: string;
    isVerified: boolean;

    constructor({ email, firstName, lastName, id, isVerified }: IUserDTO) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.id = id;
        this.isVerified = isVerified;
    }
}