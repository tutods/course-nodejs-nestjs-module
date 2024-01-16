import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  username: z.string().min(1),
  password: z.string().min(6),
});

export const createUserResponseSchema = createUserSchema.omit({ password: true });
