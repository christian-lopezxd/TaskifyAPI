import { IsString, IsNotEmpty, IsOptional, IsInt, Min, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO para la creación de una tarea
 * Define los datos requeridos y opcionales para crear una tarea, además de las validaciones y la documentación de Swagger.
 */
export class CreateTaskDto {
  
  /**
   * Título de la tarea
   * - Debe ser una cadena no vacía.
   * - Swagger: Ejemplo y descripción para documentación.
   */
  @ApiProperty({
    example: 'Complete the project report',
    description: 'The title of the task',
  })
  @IsString({ message: 'Title must be a string' }) // Valida que sea un string
  @IsNotEmpty({ message: 'Title is required' }) // Valida que no esté vacío
  title: string;

  /**
   * Descripción de la tarea (opcional)
   * - Debe ser una cadena de texto.
   * - Swagger: Ejemplo y descripción opcional para documentación.
   */
  @ApiProperty({
    example: 'Finish the final report by end of the week.',
    description: 'A brief description of the task',
    required: false,
  })
  @IsString({ message: 'Description must be a string' }) // Valida que sea un string
  @IsOptional() // Permite que sea opcional
  description?: string;

  /**
   * ID del usuario asociado a la tarea
   * - Debe ser un entero positivo.
   * - Swagger: Ejemplo y descripción para documentación.
   */
  @ApiProperty({
    example: 1,
    description: 'The ID of the user associated with this task',
  })
  @IsInt({ message: 'User ID must be an integer' }) // Valida que sea un entero
  @Min(1, { message: 'User ID must be a positive integer' }) // Valida que sea mayor o igual a 1
  userId: number;

}
