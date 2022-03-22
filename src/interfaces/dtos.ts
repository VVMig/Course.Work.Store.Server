import { UserRoles } from "constants/Roles";

export interface IUserDTO {
    id: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    isVerified?: boolean;
    role?: UserRoles;
}