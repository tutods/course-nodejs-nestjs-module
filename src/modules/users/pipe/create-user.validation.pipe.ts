import type { PipeTransform } from '@nestjs/common';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';

import type { CreateUserDTO } from '@modules/users/dtos/user.dto';

@Injectable()
export class CreateUserValidationPipe implements PipeTransform {
  transform(value: CreateUserDTO) {
    const { name, username, email, password } = value;

    if (!name || !username || !email || !password) {
      throw new UnprocessableEntityException(
        'Please valid your data. Name, username, email and password are required.',
      );
    }

    return value;
  }
}
