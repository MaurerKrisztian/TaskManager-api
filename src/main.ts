import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import {ScheduleLoader} from "./schedules/scheduelers/ScheduleLoader";

const openApiRoot = 'api/api-doc';
const port = process.env.PORT || '3000';
const version = process.env.npm_package_version || 'unknown';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {});
    app.enableCors();

    const config = new DocumentBuilder()
        .setTitle('TaskManager doc')
        .setDescription('The TaskManager API description')
        .setVersion(`v${version}`)
        .build();

    SwaggerModule.setup(
        openApiRoot,
        app,
        SwaggerModule.createDocument(app, config),
    );

    await app
        .setGlobalPrefix('api')
        .useGlobalPipes(new ValidationPipe())
        .listen(port);


    const scheduleLoader = app.get<ScheduleLoader>(ScheduleLoader);
    await scheduleLoader.load()


    return app
}

bootstrap();
