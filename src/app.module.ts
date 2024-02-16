import { Module } from '@nestjs/common';

import { UsersModule } from '@/modules/users/users.module';
import { AuthenticationModule } from '@modules/authentication/authentication.module';
import { TaskModule } from '@modules/tasks/task.module';

@Module({
  imports: [UsersModule, AuthenticationModule, TaskModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
