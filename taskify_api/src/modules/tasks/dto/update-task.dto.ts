import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsBoolean } from 'class-validator';

/**
 * DTO para la actualización de una tarea
 * Extiende de CreateTaskDto con campos opcionales, permitiendo actualizar uno o varios campos de la tarea existente.
 */
export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  
  /**
   * Título de la tarea (opcional)
   * - Es opcional en las actualizaciones, a diferencia de la creación.
   * - Swagger: Ejemplo y descripción para documentación.
   */
  @ApiProperty({
    example: 'Complete the project report',
    description: 'The title of the task',
    required: false, // Opcional en la documentación
  })
  @IsOptional() // Campo opcional
  @IsString({ message: 'Title must be a string' }) // Valida que sea una cadena de texto
  title?: string;

  /**
   * Descripción de la tarea (opcional)
   * - Es opcional y puede actualizarse independientemente de otros campos.
   * - Swagger: Ejemplo y descripción para documentación.
   */
  @ApiProperty({
    example: 'Finish the final report by end of the week.',
    description: 'A brief description of the task',
    required: false, // Opcional en la documentación
  })
  @IsOptional() // Campo opcional
  @IsString({ message: 'Description must be a string' }) // Valida que sea una cadena de texto
  description?: string;

  /**
   * Estado de la tarea (opcional)
   * - Indica si la tarea ha sido completada.
   * - Swagger: Ejemplo y descripción para documentación.
   */
  @ApiProperty({
    example: true,
    description: 'Indicates if the task is completed',
    required: false, // Opcional en la documentación
  })
  @IsOptional() // Campo opcional
  @IsBoolean({ message: 'Completed must be a boolean value' }) // Valida que sea booleano
  completed?: boolean;
}
