import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { ZodValidationPipe } from '@/infra/pipes/zod.pipe';
import { AuthenticationGuard } from '@modules/authentication/guards/authenticated.guard';
import { CreateUserDTO, FileDTO } from '@modules/users/dto/user.dto';
import { createUserSchema } from '@modules/users/schemas/create-user.schema';
import { userResponseSchema } from '@modules/users/schemas/user.schema';
import { CreateUserUseCase } from '@modules/users/usecases/create-user.usecase';
import { UploadUserAvatarUseCase } from '@modules/users/usecases/upload-user-avatar.usecase';
import { UserProfileUseCase } from '@modules/users/usecases/user-profile.usecase';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly profileUseCase: UserProfileUseCase,
    private readonly uploadUserAvatarUseCase: UploadUserAvatarUseCase,
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createUserSchema))
  async create(@Body() data: CreateUserDTO) {
    const user = await this.createUserUseCase.execute(data);

    return userResponseSchema.parse(user);
  }

  @Get('me')
  @UseGuards(AuthenticationGuard)
  async profile(@Request() req) {
    return this.profileUseCase.execute(req.user.sub);
  }

  @Put('avatar')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthenticationGuard)
  async uploadAvatar(@UploadedFile() file: FileDTO, @Request() request) {
    return this.uploadUserAvatarUseCase.execute({ file, userId: request.user.sub });
  }
}
