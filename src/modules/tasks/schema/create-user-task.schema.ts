import { z } from 'zod';

export const createUserTaskSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  username: z.string().min(1),
  password: z.string().min(6),
});
