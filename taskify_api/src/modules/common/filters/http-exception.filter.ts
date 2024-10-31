import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // Obtiene el mensaje de la excepción
    const exceptionResponse = exception.getResponse();
    let message = '';

    if (typeof exceptionResponse === 'string') {
      message = exceptionResponse;
    } else if (typeof exceptionResponse === 'object' && (exceptionResponse as any).message) {
      message = (exceptionResponse as any).message;
    }

    // Formatea la respuesta para que devuelva un objeto { message: "mensaje de error" }
    response.status(exception.getStatus()).json({ message });
  }
}
