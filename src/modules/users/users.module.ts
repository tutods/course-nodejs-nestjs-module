import { CreateUserUseCase } from '@modules/users/usecases/create-user.usecase';
import { UsersController } from '@modules/users/users.controller';
import { Module } from '@nestjs/common';

import { PrismaService } from '@/infra/database/prisma.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [PrismaService, CreateUserUseCase],
})
export class UsersModule {}
