import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTareaDto } from './dto/create-tarea.dto';
import { UpdateTareaDto } from './dto/update-tarea.dto';

@Injectable()
export class TareasService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateTareaDto) {
    return this.prisma.tarea.create({ data });
  }

  findAllByUsuario(usuarioId: number) {
    return this.prisma.tarea.findMany({ where: { usuarioId } });
  }

  update(id: number, data: UpdateTareaDto) {
    return this.prisma.tarea.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.tarea.delete({ where: { id } });
  }
}
