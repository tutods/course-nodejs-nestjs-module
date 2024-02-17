import { Module } from '@nestjs/common';

import { PrismaService } from '@/infra/database/prisma.service';
import { UserTaskPrismaRepository } from '@modules/tasks/repositories/prisma/user-task.prisma.repository';
import { IUserTaskRepository } from '@modules/tasks/repositories/user-task.repository';
import { CreateUserTaskUseCase } from '@modules/tasks/usecases/create-user-task.usecase';
import { UserTaskController } from '@modules/tasks/user-task.controller';

@Module({
  imports: [],
  controllers: [UserTaskController],
  providers: [
    PrismaService,
    CreateUserTaskUseCase,
    {
      provide: IUserTaskRepository,
      useClass: UserTaskPrismaRepository,
    },
  ],
})
export class UserTaskModule {}
