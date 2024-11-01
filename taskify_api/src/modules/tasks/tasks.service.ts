import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Crea una nueva tarea
   * @param data - Datos de la tarea a crear
   * @throws NotFoundException - Si el usuario no existe
   * @throws ConflictException - Si ya existe una tarea con el mismo título
   * @returns La tarea creada
   */
  async create(data: CreateTaskDto) {
    // Verificación preliminar para asegurar que el usuario existe
    const user = await this.prisma.user.findUnique({
      where: { id: data.userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${data.userId} not found`);
    }

    try {
      // Crea la tarea si el usuario existe
      return await this.prisma.task.create({ data });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Lanza un error si el título de la tarea es duplicado
        if (error.code === 'P2002') {
          throw new ConflictException('Task with this title already exists');
        }
      }
      throw error; // Lanza otros errores si no son específicos de Prisma
    }
  }

  /**
   * Obtiene todas las tareas de un usuario específico
   * @param userId - ID del usuario
   * @returns Una lista de tareas asociadas al usuario
   */
  async findAllByUserId(userId: number) {
    return this.prisma.task.findMany({
      where: { userId },
    });
  }

  /**
   * Obtiene una tarea por su ID
   * @param id - ID de la tarea
   * @throws NotFoundException - Si la tarea no existe
   * @returns La tarea con el ID especificado
   */
  async findOne(id: number) {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  /**
   * Actualiza una tarea existente
   * @param id - ID de la tarea
   * @param data - Datos a actualizar en la tarea
   * @throws NotFoundException - Si la tarea no existe
   * @throws BadRequestException - Si los datos proporcionados son inválidos
   * @returns La tarea actualizada
   */
  async update(id: number, data: UpdateTaskDto) {
    // Verificar si la tarea existe antes de actualizarla
    const existingTask = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!existingTask) {
      throw new NotFoundException(`Task with ID ${id} does not exist`);
    }

    try {
      // Actualizar la tarea
      return await this.prisma.task.update({
        where: { id },
        data,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new BadRequestException('Invalid data provided');
      }
      throw error;
    }
  }

  /**
   * Elimina una tarea por su ID
   * @param id - ID de la tarea
   * @throws NotFoundException - Si la tarea no existe
   * @returns La tarea eliminada
   */
  async remove(id: number) {
    // Verificar si la tarea existe antes de eliminarla
    const taskExists = await this.prisma.task.findUnique({ where: { id } });
    if (!taskExists) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    // Eliminar la tarea
    return this.prisma.task.delete({
      where: { id },
    });
  }
}
