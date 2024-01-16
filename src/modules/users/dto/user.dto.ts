import type { z } from 'zod';
import type { Prisma } from '@prisma/client';

import type { createUserResponseSchema } from '@modules/users/schema/create-user.schema';

export type CreateUserDTO = Omit<Prisma.UserCreateInput, 'createdAt' | 'id'>;

export type CreateUserResponseDTO = z.infer<typeof createUserResponseSchema>;

export type UserDTO = Prisma.UserGetPayload<false>;
