import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../services/constants';
import { UserService } from '../user/user.service';
import { AuthMiddleware } from './auth-middleware.service';
import { LogsModule } from '../logs/logs.module';

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
        }),
        LogsModule,
    ],
    providers: [AuthService, UserService, AuthMiddleware],
    controllers: [AuthController],
    exports: [AuthService, AuthMiddleware],
})
export class AuthModule {}
