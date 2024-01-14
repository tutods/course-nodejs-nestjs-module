import { Body, Controller, Post, UsePipes } from '@nestjs/common';

import { CreateUserDTO } from '@modules/users/dtos/user.dto';
import { CreateUserUseCase } from '@modules/users/usecases/create-user.usecase';

import { CreateUserValidationPipe } from './pipe/create-user.validation.pipe';

@Controller('users')
export class UsersController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  @UsePipes(new CreateUserValidationPipe())
  async create(@Body() data: CreateUserDTO) {
    return await this.createUserUseCase.execute(data);
  }
}
