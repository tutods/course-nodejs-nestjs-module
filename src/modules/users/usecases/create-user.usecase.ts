import { ConflictException, Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';

import { PrismaService } from '@/infra/database/prisma.service';
import type { CreateUserDTO } from '@modules/users/dtos/user.dto';

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

    const hashedPassword = await hash(data.password, 10);

    return await this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
  }
}
