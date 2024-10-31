import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { PrismaModule } from './modules/prisma/prisma.module';

@Module({
  imports: [UsersModule, TasksModule, PrismaModule],
})
export class AppModule {}