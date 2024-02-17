import { z } from 'zod';

import { createUserResponseSchema } from '@modules/users/schemas/create-user.schema';

export const userResponseSchema = createUserResponseSchema.merge(
  z.object({
    id: z.string(),
  }),
);
