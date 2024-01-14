import { Controller, Post } from '@nestjs/common';

@Controller()
export class LoginController {
  constructor() {}

  @Post('/sign-in')
  async signIn() {}
}
