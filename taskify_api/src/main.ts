import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './modules/common/filters/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  // Crea la aplicación a partir del módulo principal (AppModule)
  const app = await NestFactory.create(AppModule);

  // Configuración global de validación con ValidationPipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Filtra propiedades que no están en los DTOs, eliminándolas automáticamente
    forbidNonWhitelisted: true, // Lanza un error si se reciben propiedades no permitidas
    transform: true, // Convierte los tipos de datos automáticamente según los DTOs
    validationError: {
      target: false, // Excluye el objeto original del error para simplificar la respuesta
      value: false, // Excluye el valor del error para evitar información adicional innecesaria
    },
    exceptionFactory: (errors) => {
      // Personaliza el mensaje de error a mostrar
      const messages = errors.map((error) => {
        const constraints = error.constraints
          ? Object.values(error.constraints).join(', ')
          : 'Validation error';

        // Formato simplificado para los mensajes de error
        return `${error.property} error: ${constraints}`;
      });
      // Retorna una excepción de mala solicitud con los mensajes personalizados
      return new BadRequestException(messages);
    },
  }));

  // Configura un filtro global de excepciones personalizado
  app.useGlobalFilters(new HttpExceptionFilter());

  // Configuración de Swagger para la documentación de la API
  const config = new DocumentBuilder()
    .setTitle('API Documentation') // Título de la documentación
    .setDescription('API documentation for the application') // Descripción
    .setVersion('1.0') // Versión de la API
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document); // Ruta donde se servirá la documentación de Swagger

  // Arranca la aplicación en el puerto 3000
  await app.listen(3000);
}

bootstrap();
