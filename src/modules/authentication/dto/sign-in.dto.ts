import type { z } from 'zod';

import type { signInRequestSchema } from '@modules/authentication/schemas/sign-in.schema';

export type SignInRequestDTO = z.infer<typeof signInRequestSchema>;
