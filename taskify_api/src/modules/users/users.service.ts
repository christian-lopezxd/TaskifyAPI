import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<User> {
    // Inicia una transacción
    return this.prisma.$transaction(async (prisma) => {
      // Validación: verifica si el correo ya existe
      const existingUser = await prisma.user.findUnique({
        where: { email: data.email },
      });

      if (existingUser) {
        throw new ConflictException('Email is already taken');
      }

      // Si la validación pasa, crea el usuario
      return prisma.user.create({
        data,
      });
    });
  }

  async findAll() {
    return this.prisma.user.findMany({
      include: { tasks: true },
    });
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { tasks: true },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: number, data: UpdateUserDto) {
    try {
      const userExists = await this.prisma.user.findUnique({ where: { id } });
      if (!userExists) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      return await this.prisma.user.update({
        where: { id },
        data,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Email is already in use by another user');
        }
      }
      throw error;
    }
  }

  async remove(userId: number): Promise<void> {
    // Verifica si el usuario existe antes de eliminar
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // Elimina el usuario; las tareas asociadas se eliminarán automáticamente debido a la eliminación en cascada
    await this.prisma.user.delete({
      where: { id: userId },
    });
  }

}
