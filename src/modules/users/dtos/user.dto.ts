import type { Prisma } from '@prisma/client';

export type CreateUserDTO = Omit<Prisma.UserCreateInput, 'createdAt' | 'id'>;

export type UserDTO = Prisma.UserGetPayload<false>;
