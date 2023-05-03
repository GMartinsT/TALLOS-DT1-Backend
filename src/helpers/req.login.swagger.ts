import { OmitType } from "@nestjs/swagger";
import { User } from "../users/models/user.model";

export class LoginRequest extends OmitType(User, ['name', 'role']) {}