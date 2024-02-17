import { Module } from '@nestjs/common';

import { AuthenticationModule } from '@modules/authentication/authentication.module';
import { UserTaskModule } from '@modules/tasks/user-task.module';
import { UserModule } from '@modules/users/user.module';

@Module({
  imports: [UserModule, AuthenticationModule, UserTaskModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
