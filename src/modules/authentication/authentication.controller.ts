import { Body, Controller, HttpCode, HttpStatus, Post, UsePipes } from '@nestjs/common';

import { ZodValidationPipe } from '@/infra/pipes/zod.pipe';
import { SignInRequestDTO } from '@modules/authentication/dto/sign-in.dto';
import { signInRequestSchema } from '@modules/authentication/schemas/sign-in.schema';
import { SignInUseCase } from '@modules/authentication/usecases/sign-in.usecase';

@Controller()
export class AuthenticationController {
  constructor(private signInUseCase: SignInUseCase) {}

  @UsePipes(new ZodValidationPipe(signInRequestSchema))
  @Post('/sign-in')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() data: SignInRequestDTO) {
    return await this.signInUseCase.execute(data);
  }
}
