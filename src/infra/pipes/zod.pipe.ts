import type { PipeTransform } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { ZodError, type ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    try {
      const parsedValue = this.schema.parse(value);

      return parsedValue;
    } catch (error: ZodError | any) {
      if (error instanceof ZodError && error.name === 'ZodError') {
        throw new BadRequestException({
          message: 'Validation failed! Please validate the values again.',
          errors: error.issues,
        });
      }

      throw new BadRequestException('Validation error, please validate all the values.');
    }
  }
}
