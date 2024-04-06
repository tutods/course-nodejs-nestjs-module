import { z } from 'zod';

import { TaskPriority } from '@modules/tasks/enums/task-priority.enum';
import { TaskStatus } from '@modules/tasks/enums/task-status.enum';

export const createUserTaskRawSchema = z.object({
  title: z.string(),
  description: z.string(),
  startAt: z.coerce.date(),
  endAt: z.coerce.date(),
  priority: z.nativeEnum(TaskPriority),
  status: z.nativeEnum(TaskStatus),
});

export const createUserTaskSchema = createUserTaskRawSchema.merge(
  z.object({
    userId: z.string().uuid(),
  }),
);
