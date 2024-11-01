import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsInt, Min } from 'class-validator';

export class CreateTaskDto {
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title is required' })
  @ApiProperty({
    example: 'Complete the project report',
    description: 'The title of the task',
  })
  title: string;

  @IsString({ message: 'Description must be a string' })
  @IsOptional() // El campo "description" es opcional
  @ApiProperty({
    example: 'Finish the final report for the project by end of the week.',
    description: 'A brief description of the task',
    required: false,
  })
  description?: string;

  @IsInt({ message: 'User ID must be an integer' })
  @Min(1, { message: 'User ID must be a positive integer' })
  @ApiProperty({
    example: 1,
    description: 'The ID of the user associated with this task',
  })
  userId: number;
}
