import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @ApiProperty({ example: 'John Doe' }) // Propiedad visible en Swagger
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsEmail({}, {message: 'Email must be a valid email'})
  @ApiProperty({ example: 'john.doe@example.com' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;
}


