import { Module } from '@nestjs/common';

import { PrismaService } from '@/infra/database/prisma.service';
import { UserPrismaRepository } from '@modules/users/repositories/prisma/user.prisma.repository';
import { IUserRepository } from '@modules/users/repositories/user.repository';
import { UserController } from '@modules/users/use.controller';
import { CreateUserUseCase } from '@modules/users/usecases/create-user.usecase';
import { UserProfileUseCase } from '@modules/users/usecases/user-profile.usecase';

@Module({
  imports: [],
  controllers: [UserController],
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
export class UserModule {}
