import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/users/services/user.service";
import * as bcrypt from "bcryptjs"
import { User } from "src/users/models/user.model";
import { UserPayload } from "../models/UserPayload";
import { UserToken } from "../models/UserToken";
import { SocketGateway } from "src/sockets/socket.gateway";
import { LoginRequestBody } from "../models/LoginRequestBody";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly socketGateway: SocketGateway
    ) {}
    
    async login(user: LoginRequestBody) {
        const userData = await this.userService.getByEmail(user.email)
        console.log("user.email", user.email)
        console.log("logUser", user)
        console.log("logUserData", userData)
        const payload: LoginRequestBody = {
            email: user.email,
            password: user.password
        };

        this.socketGateway.emitUserLogged(userData)
        const jwtToken = this.jwtService.sign(payload);

        return {
            email: userData.email,
            _id: userData._id,
            name: userData.name,
            role: userData.role,
            access_token: jwtToken,
        }
    }

    async validateUser(userEmail: string, password: string) {
        const user = await this.userService.getByEmail(userEmail);

        if(user) {
            const comparePassword = await bcrypt.compare(password, user.password)
            if(comparePassword) {
                this.socketGateway.emitUserLogged(user)
                return {
                    ...user,
                    password: undefined
                }
            }
        }
        throw new Error("Dados incorretos");
    }

    
}