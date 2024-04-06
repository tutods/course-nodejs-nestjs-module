import { JwtModule } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';

import { IStorage } from '@/infra/providers/storage';
import { mockUser } from '@modules/users/mocks/user.mock';
import { UserInMemoryRepository } from '@modules/users/repositories/in-memory/user-in-memory.repository';
import { IUserRepository } from '@modules/users/repositories/user.repository';
import { CreateUserUseCase } from '@modules/users/usecases/create-user.usecase';
import { UploadUserAvatarUseCase } from '@modules/users/usecases/upload-user-avatar.usecase';
import { UserProfileUseCase } from '@modules/users/usecases/user-profile.usecase';
import { UserController } from '@modules/users/user.controller';

describe('# User Controller', () => {
  let userController: UserController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        CreateUserUseCase,
        UserProfileUseCase,
        UploadUserAvatarUseCase,
        {
          provide: IUserRepository,
          useClass: UserInMemoryRepository,
        },
        {
          provide: IStorage,
          useValue: {
            upload: vi.fn(),
          },
        },
      ],
      imports: [JwtModule],
    }).compile();

    userController = moduleRef.get<UserController>(UserController);
  });

  describe('## Create a new user', () => {
    it('should be able to create a new user', async () => {
      const result = await userController.create(mockUser);

      expect(result).toHaveProperty('name');
      expect(result).toHaveProperty('email');
      expect(result).toHaveProperty('username');
    });

    it("shouldn't be able to add a new user if username already exists", async () => {
      await userController.create(mockUser);

      expect(userController.create(mockUser)).rejects.toThrowError();
    });
  });
});
