import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule], // Importamos UsuariosModule para manejar la relación con usuarios.
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}