import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UserModule } from "src/users/user.module";
import { jwtConstants } from "./constants/auth.constants";
import { AuthController } from "./controllers/auth.controller";
import { AuthService } from "./services/auth.service";
import { LocalStrategy } from "./strategies/local.strategy";
import { JwtStrategy } from "./strategies/jwt.strategy";


@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '30d'}
        })
    ],
    controllers: [ AuthController ],
    providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy
    ],
    exports: [
        AuthService
    ]
})

export class AuthModule {}