import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/users/services/user.service";
import * as bcrypt from "bcryptjs"
import { User } from "src/users/models/user.model";
import { UserPayload } from "../models/UserPayload";
import { UserToken } from "../models/UserToken";
import { SocketGateway } from "src/sockets/socket.gateway";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly socketGateway: SocketGateway
    ) {}
    
    login(user: User): UserToken {
        const payload: UserPayload = {
            email: user.email,
            name: user.name,
            role: user.role
        };

        const jwtToken = this.jwtService.sign(payload);

        return {
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