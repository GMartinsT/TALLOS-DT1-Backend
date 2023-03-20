import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/users/services/user.service";
import * as bcrypt from "bcryptjs"
import { User } from "src/users/models/user.model";
import { UserPayload } from "../models/UserPayload";
import { UserToken } from "../models/UserToken";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}


    async validateUser(userEmail: string, password: string) {
        const user = await this.userService.getByEmail(userEmail);

        if(user) {
            const comparePassword = await bcrypt.compare(password, user.password)
            if(comparePassword) {
                return {
                    ...user,
                    password: undefined
                }
            }
        }
        throw new Error("Dados incorretos");
    }

    login(user: User): UserToken {
        const payload: UserPayload = {
            email: user.email,
            sub: user._id,
            name: user.name
        };

        const jwtToken = this.jwtService.sign(payload);

        return {
            access_token: jwtToken,
        }
    }
}