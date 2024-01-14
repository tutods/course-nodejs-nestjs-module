import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get('/hello')
  helloUser() {
    return 'Welcome';
  }
}
