import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/users/services/user.service";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}


    async validateUser(userEmail: string, password: string) {
        const user = await this.userService.getByEmail(userEmail);
        if(user && user.password === password) {
            const { _id, name, email, role } = user;
            return { id: _id, name, email, role};
        }
        return null;
    }

    async login(user: any) {
        const payload = { email: user.email, _id: user._id}
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}