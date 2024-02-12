import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

import { PrismaService } from '@/infra/database/prisma.service';
import type { SignInDTO } from '@modules/authentication/dto/sign-in.dto';

@Injectable()
export class SignInUseCase {
  constructor(
    private jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async execute(data: SignInDTO) {
    // Validate if user exists on database
    const user = await this.prisma.user.findFirst({
      where: {
        username: data.username,
      },
    });

    if (!user) {
      throw new UnauthorizedException("Username or password din't match.");
    }

    // Validate password
    const isPasswordMatch = await compare(data.password, user.password);

    if (!isPasswordMatch) {
      throw new UnauthorizedException("Username or password din't match.");
    }

    // Remove password from user
    const { password: _password, ...userData } = user;

    // Generate JWT Token
    const token = await this.jwtService.signAsync({
      sub: user.id,
      user: userData,
    });

    return {
      data: userData,
      token,
    };
  }
}