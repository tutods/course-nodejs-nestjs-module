import { Injectable } from '@nestjs/common';

import type { CreateUserTaskRequestDTO } from '@modules/tasks/dto/user-task.dto';
import { IUserTaskRepository } from '@modules/tasks/repositories/user-task.repository';

@Injectable()
export class CreateUserTaskUseCase {
  constructor(private userTaskRepository: IUserTaskRepository) {}

  async execute(data: CreateUserTaskRequestDTO) {
    return this.userTaskRepository.save(data);
  }
}
