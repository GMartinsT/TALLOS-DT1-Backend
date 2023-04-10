export interface UserPayload {
    email: string;
    name: string;
    role: string;
    iat?: number;
    exp?: number;
}