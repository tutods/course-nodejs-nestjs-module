import type { PrismaService } from '@/infra/database/prisma.service';
import type { CreateUserTaskRequestDTO } from '@modules/tasks/dto/user-task.dto';
import type { IUserTaskRepository } from '@modules/tasks/repositories/user-task.repository';

export class UserTaskPrismaRepository implements IUserTaskRepository {
  constructor(private prisma: PrismaService) {}

  async save({ userId, ...data }: CreateUserTaskRequestDTO) {
    return this.prisma.userTask.create({
      data: {
        task: {
          create: data,
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }
}
