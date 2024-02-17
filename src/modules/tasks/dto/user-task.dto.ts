import type { z } from 'zod';

import type {
  createUserTaskRawSchema,
  createUserTaskSchema,
} from '@modules/tasks/schema/create-user-task.schema';

export type CreateUserTaskRawRequestDTO = z.infer<typeof createUserTaskRawSchema>;

export type CreateUserTaskRequestDTO = z.infer<typeof createUserTaskSchema>;

export type UserTaskResponseDTO = {
  id: string;
};
