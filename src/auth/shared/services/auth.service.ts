import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/users/services/user.service";
import * as bcrypt from "bcryptjs"
import { User } from "src/users/models/user.model";
import { use } from "passport";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
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

    async login(user: User) {
        console.log(user)
        const payload = { email: user.email, _id: user._id}
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}