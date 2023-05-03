import { Role } from "./Role.enum";

export interface UserPayload {
    email: string;
    name: string;
    role: Role;
    iat?: number;
    exp?: number;
}