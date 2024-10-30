import { Module } from '@nestjs/common';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { TareasModule } from './modules/tareas/tareas.module';
import { PrismaModule } from './modules/prisma/prisma.module';

@Module({
  imports: [UsuariosModule, TareasModule, PrismaModule],
})
export class AppModule {}