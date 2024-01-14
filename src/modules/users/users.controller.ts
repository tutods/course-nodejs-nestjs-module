import { CreateUserDTO } from '@modules/users/dtos/user.dto';
import { CreateUserUseCase } from '@modules/users/usecases/create-user.usecase';
import { Body, Controller, HttpStatus, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  async create(@Body() data: CreateUserDTO) {
    return await this.createUserUseCase.execute(data);
  }
}
