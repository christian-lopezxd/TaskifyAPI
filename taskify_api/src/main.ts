import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './modules/common/filters/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    validationError: {
      target: false,
      value: false,
    },
    exceptionFactory: (errors) => {
      const messages = errors.map((error) => {
        const constraints = error.constraints
          ? Object.values(error.constraints).join(', ')
          : 'Validation error';

        // Elimina el valor `undefined` del mensaje final y simplifica el formato
        return `${error.property} error: ${constraints}`;
      });
      return new BadRequestException(messages);
    },
  }));
  app.useGlobalFilters(new HttpExceptionFilter());


 // Configuración de Swagger
 const config = new DocumentBuilder()
 .setTitle('API Documentation')
 .setDescription('API documentation for the application')
 .setVersion('1.0')
 .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api-docs', app, document);


await app.listen(3000);

}


bootstrap();

