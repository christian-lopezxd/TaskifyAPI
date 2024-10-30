import { Module } from '@nestjs/common';
import { TareasService } from './tareas.service';
import { TareasController } from './tareas.controller';
import { UsuariosModule } from '../usuarios/usuarios.module';

@Module({
  imports: [UsuariosModule], // Importamos UsuariosModule para manejar la relación con usuarios.
  controllers: [TareasController],
  providers: [TareasService],
})
export class TareasModule {}