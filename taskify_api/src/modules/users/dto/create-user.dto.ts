import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Juan Perez' }) // Propiedad visible en Swagger
  name: string;

  @ApiProperty({ example: 'juan@example.com' })
  email: string;
}
