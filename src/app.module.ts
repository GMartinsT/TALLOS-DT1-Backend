import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt.auth.guards';
import { UserModule } from './users/user.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://root:root@database:27017/users?authSource=admin&directConnection=true'),
    ConfigModule.forRoot(),
    UserModule,
    AuthModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
