import { Module } from '@nestjs/common';

import { PrismaService } from '@/infra/database/prisma.service';
import { UserPrismaRepository } from '@modules/users/repositories/prisma/user.prisma.repository';
import { IUserRepository } from '@modules/users/repositories/user.repository';
import { CreateUserUseCase } from '@modules/users/usecases/create-user.usecase';
import { UserProfileUseCase } from '@modules/users/usecases/user-profile.usecase';
import { UsersController } from '@modules/users/users.controller';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [
    PrismaService,
    CreateUserUseCase,
    UserProfileUseCase,
    {
      provide: IUserRepository,
      useClass: UserPrismaRepository,
    },
  ],
})
export class UsersModule {}
