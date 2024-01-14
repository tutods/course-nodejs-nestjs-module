import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/infra/database/prisma.service';
import type { CreateUserDTO, UserDTO } from '@modules/users/dtos/user.dto';
import type { IUserRepository } from '@modules/users/repositories/user.repository';

@Injectable()
export class UserPrismaRepository implements IUserRepository {
  constructor(private prisma: PrismaService) {}

  /**
   * Method to create a new user
   * @param data New user data
   * @returns Created used
   */
  async save(data: CreateUserDTO) {
    return await this.prisma.user.create({
      data,
    });
  }

  /**
   * Method to find an user by email or username
   * @param data Username and email to search on database
   * @returns User or null
   */
  async findByUsernameOrEmail(data: Pick<UserDTO, 'email' | 'username'>) {
    return await this.prisma.user.findFirst({
      where: {
        OR: [{ username: data.username }, { email: data.email }],
      },
    });
  }
}
