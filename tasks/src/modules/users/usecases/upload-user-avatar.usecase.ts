import { BadRequestException, Injectable } from '@nestjs/common';
import { extname } from 'path';

import { IStorage } from '@/infra/providers/storage';
import type { AvatarDTO } from '@modules/users/dto/user.dto';
import { IUserRepository } from '@modules/users/repositories/user.repository';

@Injectable()
export class UploadUserAvatarUseCase {
  constructor(
    private storage: IStorage,
    private userRepository: IUserRepository,
  ) {}

  async execute(data: AvatarDTO) {
    const fileExtension = extname(data.file.originalname);
    const transformName = `${data.userId}${fileExtension}`;

    const file = await this.storage.upload(
      {
        ...data.file,
        originalname: transformName,
      },
      'avatar',
    );

    if (!!file.error) {
      throw new BadRequestException({
        message: 'Error uploading avatar',
        file: data.file,
      });
    }

    await this.userRepository.uploadAvatar(data.userId, file.path);

    return {
      message: 'Avatar uploaded successfully!',
      path: file.path,
    };
  }
}
