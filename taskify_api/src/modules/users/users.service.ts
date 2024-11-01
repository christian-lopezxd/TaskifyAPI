import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  // Método para crear un nuevo usuario con validación de email y manejo de transacciones
  async create(data: CreateUserDto): Promise<User> {
    // Inicia una transacción con Prisma
    return this.prisma.$transaction(async (prisma) => {
      // Verifica si el correo ya está registrado
      const existingUser = await prisma.user.findUnique({
        where: { email: data.email },
      });

      // Si el correo ya existe, lanza una excepción de conflicto
      if (existingUser) {
        throw new ConflictException('Email is already taken');
      }

      // Si el correo es único, crea el usuario
      return prisma.user.create({
        data,
      });
    });
  }

  // Método para obtener todos los usuarios y sus tareas asociadas
  async findAll() {
    return this.prisma.user.findMany({
      include: { tasks: true }, // Incluye las tareas del usuario
    });
  }

  // Método para obtener un usuario específico por su ID
  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { tasks: true }, // Incluye las tareas del usuario en la respuesta
    });

    // Lanza una excepción si el usuario no se encuentra
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user; // Retorna el usuario si es encontrado
  }

  // Método para actualizar los datos de un usuario específico
  async update(id: number, data: UpdateUserDto) {
    try {
      // Verifica si el usuario existe antes de actualizar
      const userExists = await this.prisma.user.findUnique({ where: { id } });
      if (!userExists) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      // Actualiza el usuario con los nuevos datos
      return await this.prisma.user.update({
        where: { id },
        data,
      });
    } catch (error) {
      // Si el error es conocido (como duplicación de email), lanza una excepción específica
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Email is already in use by another user');
        }
      }
      // Lanza otros errores no manejados
      throw error;
    }
  }

  // Método para eliminar un usuario específico y sus tareas en cascada
  async remove(userId: number): Promise<void> {
    // Verifica si el usuario existe antes de intentar eliminarlo
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    // Si el usuario no existe, lanza una excepción de no encontrado
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // Elimina el usuario; las tareas relacionadas se eliminan en cascada
    await this.prisma.user.delete({
      where: { id: userId },
    });
  }
}
