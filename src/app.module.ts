import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TaskboardModule} from './taskboard/taskboard.module';
import {TaskModule} from './task/task.module';
import {UserModule} from './user/user.module';
import {AuthModule} from './auth/auth.module';
import {DatabaseModule} from './database/database.module';
import {MongooseModule} from "@nestjs/mongoose";
import {ConfigModule} from "@nestjs/config";
import {AuthMiddleware} from "./auth/auth-middleware.service";
import {JwtModule, JwtService} from "@nestjs/jwt";
import {jwtConstants} from "./services/constants";
import {UserController} from "./user/user.controller";

@Module({
    imports: [ConfigModule.forRoot({
        envFilePath: '.env',
        isGlobal: true,
    }),
        MongooseModule.forRoot(process.env.DB_URI),
        TaskboardModule, TaskModule, UserModule, AuthModule, DatabaseModule, JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: {expiresIn: '5h'},
        }),
        UserModule
    ],
    controllers: [AppController],
    providers: [AppService, AuthMiddleware],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware).forRoutes("*")
    }
}
