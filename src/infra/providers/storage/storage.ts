import type { FileDTO } from '@modules/users/dto/user.dto';

export abstract class IStorage {
  abstract upload(
    file: FileDTO,
    folder: string,
  ): Promise<
    | {
        data: { path: string };
        error: null;
      }
    | {
        data: null;
        error: unknown;
      }
  >;
}
