import type { FileDTO } from '@modules/users/dto/user.dto';

export abstract class IStorage {
  abstract utepload(
    file: FileDTO,
    folder: string,
  ): Promise<
    | {
        path: string;
        error: never;
      }
    | {
        path: never;
        error: Error;
      }
  >;

  abstract getPublicUrl(path: string): Promise<string>;
}
