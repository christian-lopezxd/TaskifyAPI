import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  /**
   * Nombre del usuario
   * @example "John Doe"
   */
  @IsString()
  @ApiProperty({ example: 'John Doe' }) // Propiedad visible en Swagger con ejemplo de uso
  @IsNotEmpty({ message: 'Name is required' }) // Valida que el nombre no esté vacío
  name: string;

  /**
   * Email del usuario
   * @example "john.doe@example.com"
   */
  @IsEmail({}, { message: 'Email must be a valid email' }) // Valida que el email tenga un formato correcto
  @ApiProperty({ example: 'john.doe@example.com' }) // Propiedad visible en Swagger con ejemplo de uso
  @IsNotEmpty({ message: 'Email is required' }) // Valida que el email no esté vacío
  email: string;
}
