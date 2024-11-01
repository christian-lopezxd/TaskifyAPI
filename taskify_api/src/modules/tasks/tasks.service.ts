import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateTaskDto) {
    try {
      return await this.prisma.task.create({ data });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') { // Código de error de duplicidad en Prisma
          throw new ConflictException('Task with this title already exists');
        }
      }
      throw error;
    }
  }


   // Método para obtener todas las tareas por userId
   async findAllByUserId(userId: number) {
    return this.prisma.task.findMany({
      where: { userId },
    });
  }

  async findOne(id: number) {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async update(id: number, data: UpdateTaskDto) {
    // Primero verifica si la tarea existe
    const taskExists = await this.prisma.task.findUnique({ where: { id } });
    if (!taskExists) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    try {
      return await this.prisma.task.update({
        where: { id },
        data,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Task with this title already exists');
        }
      }
      throw error;
    }
  }

  async remove(id: number) {
    const taskExists = await this.prisma.task.findUnique({ where: { id } });
    if (!taskExists) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return this.prisma.task.delete({
      where: { id },
    });
  }
}
