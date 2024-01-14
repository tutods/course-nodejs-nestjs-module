import type { CreateUserDTO, UserDTO } from '@modules/users/dtos/user.dto';

export abstract class IUserRepository {
  /**
   * Method to save a new user
   * @param data User data
   */
  abstract save(data: CreateUserDTO): Promise<UserDTO>;

  /**
   * Method to retrieve users from `username` or `email`
   * @param value Email or username
   */
  abstract findByUsernameOrEmail(
    data: Partial<Pick<UserDTO, 'email' | 'username'>>,
  ): Promise<UserDTO | null>;
}
