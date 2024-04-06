import { faker } from '@faker-js/faker';

import type { CreateUserDTO } from '@modules/users/dto/user.dto';

/**
 * Fake data for user
 */
const name = [faker.person.firstName(), faker.person.lastName()];
export const mockUser: CreateUserDTO = {
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
