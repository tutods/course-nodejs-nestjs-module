import { z } from 'zod';

import { createUserResponseSchema } from '@modules/users/schemas/create-user.schema';

/**
 * User response schema
 * @description This schema contains the fields necessary to create a new user
 * (except the password), adding the `id`, the `avatarUrl` and the `createdAt` properties.
 */
export const userResponseSchema = z
  .object({
    id: z.string(),
  })
  .merge(createUserResponseSchema)
  .merge(
    z.object({
      // TODO: check
      avatarUrl: z.string().nullable(),
      createdAt: z.date(),
    }),
  );
