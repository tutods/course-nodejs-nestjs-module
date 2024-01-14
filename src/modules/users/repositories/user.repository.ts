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

  /**
   * Method to retrieve an user using the unique id
   * @param id User id
   * @params includePassword Should include or not the password field
   */
  abstract findById(
    id: string,
    includePassword?: boolean,
  ): Promise<UserDTO | Omit<UserDTO, 'password'> | null>;
}
