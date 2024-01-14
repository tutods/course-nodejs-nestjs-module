import type { Prisma } from '@prisma/client';

export type CreateUserDTO = Omit<Prisma.UserCreateInput, 'createdAt' | 'id'>;
