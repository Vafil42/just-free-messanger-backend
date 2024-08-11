import { BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';

export const validateOrThrow = async (obj: Object) => {
  const errors = await validate(obj);
  if (errors.length) throw new BadRequestException(errors);
};
