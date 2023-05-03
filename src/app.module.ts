import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt.auth.guards';
import { UserModule } from './users/user.module';
import { SocketModule } from './sockets/socket.module';
import { SocketGateway } from './sockets/socket.gateway';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://root:root@database:27017/users?authSource=admin&directConnection=true'),
    ConfigModule.forRoot(),
    UserModule,
    AuthModule,
    SocketModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    SocketGateway
  ],
})
export class AppModule {}
