import type {
  CreateUserTaskRequestDTO,
  UserTaskResponseDTO,
} from '@modules/tasks/dto/user-task.dto';

export abstract class IUserTaskRepository {
  abstract save(data: CreateUserTaskRequestDTO): Promise<UserTaskResponseDTO>;
}
