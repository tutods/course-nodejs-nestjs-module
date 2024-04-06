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
    return this.prisma.user.create({
      data,
    });
  }

  /**
   * Method to find a user by email or username
   * @param data Username and email to search on database
   * @returns User or null
   */
  async findByUsernameOrEmail(data: Partial<Pick<UserDTO, 'email' | 'username'>>) {
    return this.prisma.user.findFirst({
      where: {
        OR: [{ username: data.username }, { email: data.email }],
      },
    });
  }

  /**
   * Method to retrieve a user using the unique id
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

  /**
   * Method to assing an uploaded avatar to a user
   * @param id
   * @param path
   */
  async uploadAvatar(id: string, path: string) {
    await this.prisma.user.update({
      data: {
        avatarUrl: path,
      },
      where: {
        id,
      },
    });
  }
}
