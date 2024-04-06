import { faker } from '@faker-js/faker';
import { Test } from '@nestjs/testing';

import type { CreateUserDTO } from '@modules/users/dto/user.dto';
import { UserInMemoryRepository } from '@modules/users/repositories/in-memory/user-in-memory.repository';
import { IUserRepository } from '@modules/users/repositories/user.repository';
import { CreateUserUseCase } from '@modules/users/usecases/create-user.usecase';

describe('# Create User Usecase', () => {
  let createUserUseCase: CreateUserUseCase;

  /**
   * Fake data for user
   */
  const name = [faker.person.firstName(), faker.person.lastName()];
  const data: CreateUserDTO = {
    email: faker.internet
      .email({
        firstName: name[0],
        lastName: name[1],
      })
      .toLowerCase(),
    name: name.join(' '),
    password: faker.internet.password(),
    username: faker.internet
      .userName({
        firstName: name[0],
        lastName: name[1],
      })
      .toLowerCase(),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CreateUserUseCase,
        {
          provide: IUserRepository,
          useClass: UserInMemoryRepository,
        },
      ],
    }).compile();

    createUserUseCase = moduleRef.get<CreateUserUseCase>(CreateUserUseCase);
  });

  it('should be able to create a new user', async () => {
    const result = await createUserUseCase.execute(data);

    expect(result).toHaveProperty('id');
  });

  it('should not be able to create a new user if username already exists', async () => {
    await createUserUseCase.execute(data);

    expect(createUserUseCase.execute(data)).rejects.toThrowError();
  });
});
