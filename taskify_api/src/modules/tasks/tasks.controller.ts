import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

/**
 * Controlador para el manejo de tareas
 * Define los endpoints de la API relacionados con las tareas y documenta cada ruta con Swagger.
 */
@ApiTags('tasks') // Agrupa las rutas bajo la etiqueta "tasks" en Swagger
@Controller('tasks') // Define el prefijo '/tasks' para todas las rutas en este controlador
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  /**
   * Crea una nueva tarea
   * @param createTaskDto - Datos de la tarea a crear
   * @returns La tarea creada
   */
  @Post()
  @ApiResponse({ status: 201, description: 'Task created successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  /**
   * Obtiene todas las tareas de un usuario específico
   * @param userId - ID del usuario
   * @returns Una lista de tareas del usuario especificado
   */
  @Get('/user/:userId')
  @ApiResponse({ status: 200, description: 'Retrieve all tasks for a specific user' })
  async findAllByUserId(@Param('userId', ParseIntPipe) userId: number) {
    return this.tasksService.findAllByUserId(userId);
  }

  /**
   * Obtiene una tarea por su ID
   * @param id - ID de la tarea
   * @returns La tarea con el ID especificado
   */
  @Get(':id')
  @ApiResponse({ status: 200, description: 'Task found.' })
  @ApiResponse({ status: 404, description: 'Not Found - Task with this ID does not exist.' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.findOne(id);
  }

  /**
   * Actualiza una tarea existente
   * @param id - ID de la tarea
   * @param updateTaskDto - Datos a actualizar en la tarea
   * @returns La tarea actualizada
   */
  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Task updated successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request - Invalid data.' })
  @ApiResponse({ status: 404, description: 'Not Found - Task with this ID does not exist.' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.update(id, updateTaskDto);
  }

  /**
   * Elimina una tarea por su ID
   * @param id - ID de la tarea
   * @returns Una respuesta sin contenido indicando que la tarea fue eliminada
   */
  @Delete(':id')
  @ApiResponse({ status: 204, description: 'Task deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Not Found - Task with this ID does not exist.' })
  @HttpCode(HttpStatus.NO_CONTENT) // Retorna un código de estado 204 al eliminar con éxito
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.remove(id);
  }
}
