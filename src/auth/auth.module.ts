import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {UserModule} from "../user/user.module";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "../services/constants";
import {UserService} from "../user/user.service";
import {AuthMiddleware} from "./auth-middleware.service";

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: {expiresIn: '5h'},
        }),
    ],
    providers: [AuthService, UserService, AuthMiddleware],
    controllers: [AuthController],
    exports: [AuthService, AuthMiddleware],
})
export class AuthModule {
}
