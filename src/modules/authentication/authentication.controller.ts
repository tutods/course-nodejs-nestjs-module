import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { SignInDTO } from '@modules/authentication/dto/sign-in.dto';
import { SignInUseCase } from '@modules/authentication/usecases/sign-in.usecase';

@Controller()
export class AuthenticationController {
  constructor(private signInUseCase: SignInUseCase) {}

  @Post('/sign-in')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() data: SignInDTO) {
    return await this.signInUseCase.execute(data);
  }
}
