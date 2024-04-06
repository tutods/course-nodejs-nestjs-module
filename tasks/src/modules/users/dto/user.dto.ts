import type { z } from 'zod';
import type { Prisma } from '@prisma/client';

import type { createUserResponseSchema } from '@modules/users/schemas/create-user.schema';

export type CreateUserDTO = Omit<Prisma.UserCreateInput, 'createdAt' | 'id' | 'avatarUrl'>;

export type CreateUserResponseDTO = z.infer<typeof createUserResponseSchema>;

export type UserDTO = Prisma.UserGetPayload<false>;

export type FileDTO = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
};

export type AvatarDTO = {
  file: FileDTO;
  userId: string;
};
