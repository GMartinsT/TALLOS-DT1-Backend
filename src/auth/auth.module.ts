import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UserModule } from "src/users/user.module";
import { jwtConstants } from "./constants/auth.constants";
import { AuthController } from "./controllers/auth.controller";
import { AuthService } from "./services/auth.service";
import { LocalStrategy } from "./strategies/local.strategy";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { LoginValidationMiddleware } from "./middlewares/login.validation.middleware";
import { SocketGateway } from "src/sockets/socket.gateway";
import { RolesGuard } from "./guards/role.guard";


@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '24h'}
        })
    ],
    controllers: [ AuthController ],
    providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy,
        SocketGateway,
        RolesGuard
    ],
    exports: [
        AuthService
    ]
})

export class AuthModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
      consumer.apply(LoginValidationMiddleware).forRoutes('login');
    }
  }