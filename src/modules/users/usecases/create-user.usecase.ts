import { ConflictException, Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';

import type { CreateUserDTO } from '@modules/users/dto/user.dto';
import { IUserRepository } from '@modules/users/repositories/user.repository';

@Injectable()
export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: CreateUserDTO) {
    const userExists = await this.userRepository.findByUsernameOrEmail({
      username: data.username,
      email: data.email,
    });

    if (!!userExists) {
      throw new ConflictException('User already exists!');
    }

    const password = await hash(data.password, 10);

    return await this.userRepository.save({
      ...data,
      password,
    });
  }
}
