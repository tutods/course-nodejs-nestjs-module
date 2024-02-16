import type { z } from 'zod';

import type { createUserTaskSchema } from '@modules/tasks/schema/create-user-task.schema';

export type CreateUserTaskRawRequestDTO = z.infer<typeof createUserTaskSchema>;

export type CreateUserTaskRequestDTO = CreateUserTaskRawRequestDTO & {
  userId: string;
};

export type UserTaskResponseDTO = {
  id: string;
};
