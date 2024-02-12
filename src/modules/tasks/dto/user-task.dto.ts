import type { z } from 'zod';

import type { createUserTaskSchema } from '@modules/tasks/schema/create-user-task.schema';

export type CreateUserResponseDTO = z.infer<typeof createUserTaskSchema>;
