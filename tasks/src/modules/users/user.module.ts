import { Module } from '@nestjs/common';

import { PrismaService } from '@/infra/database/prisma.service';
import { IStorage } from '@/infra/providers/storage';
import { SupabaseStorage } from '@/infra/providers/storage/supabase.storage';
import { UserPrismaRepository } from '@modules/users/repositories/prisma/user.prisma.repository';
import { IUserRepository } from '@modules/users/repositories/user.repository';
import { CreateUserUseCase } from '@modules/users/usecases/create-user.usecase';
import { UploadUserAvatarUseCase } from '@modules/users/usecases/upload-user-avatar.usecase';
import { UserProfileUseCase } from '@modules/users/usecases/user-profile.usecase';
import { UserController } from '@modules/users/user.controller';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    PrismaService,
    CreateUserUseCase,
    UserProfileUseCase,
    UploadUserAvatarUseCase,
    {
      provide: IUserRepository,
      useClass: UserPrismaRepository,
    },
    {
      provide: IStorage,
      useClass: SupabaseStorage,
    },
  ],
})
export class UserModule {}
