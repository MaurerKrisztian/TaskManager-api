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
import {EmailModule} from './email/email.module';
import {FileModule} from './file/file.module';
import {WorkedtimeModule} from './workedtime/workedtime.module';
import {LogsModule} from './logs/logs.module';

import databaseConfig from './services/config/database.config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [databaseConfig],
        }),
        MongooseModule.forRoot(process.env.DB_URI),
        TaskboardModule, TaskModule, UserModule, AuthModule, DatabaseModule, JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: {expiresIn: '5h'},
        }),
        UserModule,
        EmailModule,
        FileModule,
        WorkedtimeModule,
        LogsModule
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
