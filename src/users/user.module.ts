import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserController } from "./controllers/user.controller";
import { UserService } from "./services/user.service";
import { SocketGateway } from "src/sockets/socket.gateway";
import { User, UserSchema } from "./models/user.model";
import { JwtAuthGuard } from "src/auth/guards/jwt.auth.guards";
import { APP_GUARD } from "@nestjs/core"


@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ],
    controllers: [
        UserController
    ],
    providers: [
        UserService,
        SocketGateway,
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard
        },
    ],
    exports: [
        UserService,
    ]
})
export class UserModule {}