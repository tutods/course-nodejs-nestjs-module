import { Body, Controller, Get, Post, Request, UseGuards, UsePipes } from '@nestjs/common';

import { ZodValidationPipe } from '@/infra/pipes/zod.pipe';
import { AuthenticationGuard } from '@modules/authentication/guards/authenticated.guard';
import { CreateUserDTO } from '@modules/users/dto/user.dto';
import {
  createUserResponseSchema,
  createUserSchema,
} from '@modules/users/schema/create-user.schema';
import { CreateUserUseCase } from '@modules/users/usecases/create-user.usecase';
import { UserProfileUseCase } from '@modules/users/usecases/user-profile.usecase';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly profileUseCase: UserProfileUseCase,
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createUserSchema))
  async create(@Body() data: CreateUserDTO) {
    const user = await this.createUserUseCase.execute(data);

    return createUserResponseSchema.parse(user);
  }

  @Get('me')
  @UseGuards(AuthenticationGuard)
  async profile(@Request() req) {
    return this.profileUseCase.execute(req.user.sub);
  }
}
