import { ApiProperty } from '@nestjs/swagger';

export class CreateUsuarioDto {
  @ApiProperty({ example: 'Juan Perez' }) // Propiedad visible en Swagger
  nombre: string;

  @ApiProperty({ example: 'juan@example.com' })
  email: string;
}
