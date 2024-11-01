import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Task created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request - Invalid data.' })
  @ApiResponse({ status: 409, description: 'Conflict - Task with this title already exists.' })
  async create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

   // Ruta para obtener todas las tareas por userId
   @Get('/user/:userId')
   @ApiResponse({ status: 200, description: 'Retrieve all tasks for a specific user' })
   async findAllByUserId(@Param('userId', ParseIntPipe) userId: number) {
     return this.tasksService.findAllByUserId(userId);
   }
 

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Task found.' })
  @ApiResponse({ status: 404, description: 'Not Found - Task with this ID does not exist.' })
  async findOne(@Param('id') id: number) {
    return this.tasksService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Task updated successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request - Invalid data.' })
  @ApiResponse({ status: 404, description: 'Not Found - Task with this ID does not exist.' })
  @ApiResponse({ status: 409, description: 'Conflict - Task with this title already exists.' })
  async update(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 204, description: 'Task deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Not Found - Task with this ID does not exist.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: number) {
    return this.tasksService.remove(+id);
  }
}
