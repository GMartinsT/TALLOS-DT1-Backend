import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/users/services/user.service";
import * as bcrypt from "bcryptjs"

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
                user.password = undefined

                return {user}
            }
        }
        throw new Error("Dados incorretos");
        
        //if(user && user.password === password) {
        //    const { _id, name, email, role } = user;
        //    return { id: _id, name, email, role};
        //}
        //return null;
    }

    async login(user: any) {
        const payload = { email: user.email, _id: user._id}
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}