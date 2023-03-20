import { Request } from "express";
import { User } from "src/users/models/user.model";

export interface AuthRequest extends Request {
    user: User;
}