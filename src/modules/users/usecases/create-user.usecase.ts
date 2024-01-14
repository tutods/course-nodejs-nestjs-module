import type { CreateUserDTO } from '@modules/users/dtos/user.dto';
import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';

import { PrismaService } from '@/infra/database/prisma.service';

@Injectable()
export class CreateUserUseCase {
  constructor(private prisma: PrismaService) {}

  async execute(data: CreateUserDTO) {
    const userExists = await this.prisma.user.findFirst({
      where: {
        OR: [{ username: data.username }, { email: data.email }],
      },
    });

    if (!!userExists) {
      throw new ConflictException('User already exists!');
    }

    return await this.prisma.user.create({
      data,
    });
  }
}
