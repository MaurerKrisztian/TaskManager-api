import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

const openApiRoot = 'api-doc';
const port = process.env.PORT || '3000';
const version = process.env.npm_package_version || 'unknown';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('TaskManager doc')
    .setDescription('The TaskManager API description')
    .setVersion(`v${version}`)
    .addTag('TaskManager')
    .build();

  SwaggerModule.setup(
    openApiRoot,
    app,
    SwaggerModule.createDocument(app, config),
  );

  return app
    .setGlobalPrefix('api')
    .useGlobalPipes(new ValidationPipe())
    .listen(port);
}

bootstrap();
