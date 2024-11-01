import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @ApiProperty({
    example: 'Complete the project report',
    description: 'The title of the task',
    required: false, // Opcional en el contexto de actualización
  })
  title?: string;

  @ApiProperty({
    example: 'Finish the final report by end of the week.',
    description: 'A brief description of the task',
    required: false,
  })
  description?: string;

  @ApiProperty({
    example: 1,
    description: 'The ID of the user associated with this task',
    required: false,
  })
  userId?: number;
}
