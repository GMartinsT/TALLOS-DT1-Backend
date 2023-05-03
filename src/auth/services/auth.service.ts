import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/users/services/user.service";
import * as bcrypt from "bcryptjs"
import { User } from "src/users/models/user.model";
import { UserPayload } from "../models/UserPayload";
import { SocketGateway } from "src/sockets/socket.gateway";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly socketGateway: SocketGateway
    ) {}
    
    login(user: User) {
        const payload: UserPayload = {
            name: user.name,
            email: user.email,
            role: user.role
        };

        this.socketGateway.emitUserLogged(user)
        const jwtToken = this.jwtService.sign(payload);

        return {
            access_token: jwtToken,
            user
        }
    }

    async validateUser(userEmail: string, password: string) {
        const user = await this.userService.getByEmail(userEmail);

        if(user) {
            const comparePassword = await bcrypt.compare(password, user.password)
            if(comparePassword) {
                this.socketGateway.emitUserLogged(user)
                return {
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    _id: user._id
                }
            }
        }
        throw new Error("Dados incorretos");
    }

    
}