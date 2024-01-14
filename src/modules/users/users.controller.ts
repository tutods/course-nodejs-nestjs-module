import { Body, Controller, Get, Post, Request, UseGuards, UsePipes } from '@nestjs/common';

import { IsAuthenticatedGuard } from '@modules/login/guards/is-authenticated.guard';
import { CreateUserDTO } from '@modules/users/dtos/user.dto';
import { CreateUserUseCase } from '@modules/users/usecases/create-user.usecase';
import { UserProfileUseCase } from '@modules/users/usecases/user-profile.usecase';

import { CreateUserValidationPipe } from './pipe/create-user.validation.pipe';

@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly profileUseCase: UserProfileUseCase,
  ) {}

  @Post()
  @UsePipes(new CreateUserValidationPipe())
  async create(@Body() data: CreateUserDTO) {
    return await this.createUserUseCase.execute(data);
  }

  @Get('me')
  @UseGuards(IsAuthenticatedGuard)
  async profile(@Request() req) {
    return this.profileUseCase.execute(req.user.sub);
  }
}
