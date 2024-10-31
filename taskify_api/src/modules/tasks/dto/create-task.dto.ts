import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    example: 'Complete the project report',
    description: 'The title of the task',
  })
  title: string;

  @ApiProperty({
    example: 'Finish the final report for the project by end of the week.',
    description: 'A brief description of the task',
    required: false, // Indica que es opcional
  })
  description?: string;

  @ApiProperty({
    example: 1,
    description: 'The ID of the user associated with this task',
  })
  userId: number;
}
