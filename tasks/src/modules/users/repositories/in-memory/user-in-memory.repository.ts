import { faker } from '@faker-js/faker';

import type { CreateUserDTO, UserDTO } from '@modules/users/dto/user.dto';
import type { IUserRepository } from '@modules/users/repositories/user.repository';

export class UserInMemoryRepository implements IUserRepository {
  #users: UserDTO[] = [];

  async save(data: CreateUserDTO) {
    const user = { id: faker.string.uuid(), ...data, avatarUrl: null, createdAt: new Date() };

    this.#users.push(user);

    return user;
  }

  async findByUsernameOrEmail(
    data: Partial<
      Pick<
        {
          id: string;
          username: string;
          email: string;
          name: string;
          password: string;
          avatarUrl: string | null;
          createdAt: Date;
        },
        'username' | 'email'
      >
    >,
  ) {
    return (
      this.#users.find(user => user.username === data.username || user.email === data.email) ?? null
    );
  }

  async findById(id: string, includePassword?: boolean | undefined) {
    const user = this.#users.find(user => user.id === id);

    if (!user) {
      return null;
    }

    if (!includePassword) {
      const { password: _password, ...restOfUser } = user;

      return restOfUser;
    }

    return user ?? null;
  }

  uploadAvatar(id: string, path: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
