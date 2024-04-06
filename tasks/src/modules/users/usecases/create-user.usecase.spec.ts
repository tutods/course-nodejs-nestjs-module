import { Test } from '@nestjs/testing';

import { mockUser } from '@modules/users/mocks/user.mock';
import { UserInMemoryRepository } from '@modules/users/repositories/in-memory/user-in-memory.repository';
import { IUserRepository } from '@modules/users/repositories/user.repository';
import { CreateUserUseCase } from '@modules/users/usecases/create-user.usecase';

describe('# Create User Usecase', () => {
  let createUserUseCase: CreateUserUseCase;

  /**
   * Fake data for user
   */
  const data = mockUser;

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
