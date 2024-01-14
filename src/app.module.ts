import { Module } from '@nestjs/common';

import { UsersModule } from '@/modules/users/users.module';
import { AuthenticationModule } from '@modules/login/authentication.module';

@Module({
  imports: [UsersModule, AuthenticationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
