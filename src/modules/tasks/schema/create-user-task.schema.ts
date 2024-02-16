import { z } from 'zod';

import { TaskPriority } from '@modules/tasks/enums/task-priority.enum';
import { TaskStatus } from '@modules/tasks/enums/task-status.enum';

export const createUserTaskSchema = z.object({
  title: z.string(),
  description: z.string(),
  startAt: z.date(),
  endAt: z.date(),
  priority: z.nativeEnum(TaskPriority),
  status: z.nativeEnum(TaskStatus),
});
