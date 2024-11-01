import { IsString, IsNotEmpty, IsOptional, IsInt, Min, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    example: 'Complete the project report',
    description: 'The title of the task',
  })
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @ApiProperty({
    example: 'Finish the final report by end of the week.',
    description: 'A brief description of the task',
    required: false,
  })
  @IsString({ message: 'Description must be a string' })
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: 1,
    description: 'The ID of the user associated with this task',
  })
  @IsInt({ message: 'User ID must be an integer' })
  @Min(1, { message: 'User ID must be a positive integer' })
  userId: number;


}
