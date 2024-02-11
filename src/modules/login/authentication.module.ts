import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { PrismaService } from '@/infra/database/prisma.service';
import { AuthenticationController } from '@modules/login/authentication.controller';
import { SignInUseCase } from '@modules/login/usecases/sign-in.usecase';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'test-secret',
      signOptions: {
        expiresIn: '2h',
      },
    }),
  ],
  controllers: [AuthenticationController],
  providers: [PrismaService, SignInUseCase],
})
export class AuthenticationModule {}
