import { Injectable } from '@nestjs/common';
import type { SupabaseClient } from '@supabase/supabase-js';
import { createClient } from '@supabase/supabase-js';

import type { IStorage } from '@/infra/providers/storage/storage';
import type { FileDTO } from '@modules/users/dto/user.dto';

@Injectable()
export class SupabaseStorage implements IStorage {
  #client: SupabaseClient;

  constructor() {
    this.#client = createClient(process.env.SUPABASE_URL ?? '', process.env.SUPABASE_KEY ?? '');
  }

  async upload(file: FileDTO, folder: string) {
    return await this.#client.storage
      .from(process.env.SUPABASE_BUCKET ?? '')
      .upload(`${folder}/${file.originalname}`, file.buffer, {
        upsert: true,
      });
  }
}