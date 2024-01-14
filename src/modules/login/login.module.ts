import { Module } from '@nestjs/common';

import { LoginController } from '@modules/login/login.controller';

@Module({
  imports: [],
  controllers: [LoginController],
  providers: [],
})
export class LoginModule {}
