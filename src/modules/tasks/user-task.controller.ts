import { Body, Controller, Post, Request, UseGuards, UsePipes } from '@nestjs/common';

import { ZodValidationPipe } from '@/infra/pipes/zod.pipe';
import { AuthenticationGuard } from '@modules/authentication/guards/authenticated.guard';
import { CreateUserTaskRawRequestDTO } from '@modules/tasks/dto/user-task.dto';
import { createUserTaskRawSchema } from '@modules/tasks/schemas/create-user-task.schema';
import { CreateUserTaskUseCase } from '@modules/tasks/usecases/create-user-task.usecase';

@Controller('tasks')
export class UserTaskController {
  constructor(private createUserTaskUseCase: CreateUserTaskUseCase) {}

  @UseGuards(AuthenticationGuard)
  @UsePipes(new ZodValidationPipe(createUserTaskRawSchema))
  @Post()
  async create(@Body() data: CreateUserTaskRawRequestDTO, @Request() request) {
    return this.createUserTaskUseCase.execute({
      ...data,
      userId: request.user.sub,
    });
  }
}
