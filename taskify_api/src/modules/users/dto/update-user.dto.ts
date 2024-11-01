import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  /**
   * Nombre del usuario (opcional para actualización)
   * @example "John Doe"
   */
  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the user',
    required: false, // Opcional en el contexto de actualización
  })
  name?: string;

  /**
   * Dirección de correo electrónico del usuario (opcional para actualización)
   * @example "john.doe@example.com"
   */
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email address of the user',
    required: false,
  })
  email?: string;
}
