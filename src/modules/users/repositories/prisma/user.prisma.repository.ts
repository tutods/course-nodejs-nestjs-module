import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/infra/database/prisma.service';
import { prismaExclude } from '@/infra/database/prisma-exclude';
import type { CreateUserDTO, UserDTO } from '@modules/users/dto/user.dto';
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
  async findByUsernameOrEmail(data: Partial<Pick<UserDTO, 'email' | 'username'>>) {
    return await this.prisma.user.findFirst({
      where: {
        OR: [{ username: data.username }, { email: data.email }],
      },
    });
  }

  /**
   * Method to retrieve an user using the unique id
   * @param id User id
   * @returns User or null
   */
  async findById(id: string, includePassword = false) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: !includePassword ? prismaExclude('User', ['password']) : undefined,
    });

    if (!user) {
      return null;
    }

    return user;
  }
}
