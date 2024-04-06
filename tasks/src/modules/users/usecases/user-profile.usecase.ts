import { Injectable, NotFoundException } from '@nestjs/common';

import { IUserRepository } from '@modules/users/repositories/user.repository';

@Injectable()
export class UserProfileUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: string) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException(`User id ${id} not found or invalid!`);
    }

    return user;
  }
}
