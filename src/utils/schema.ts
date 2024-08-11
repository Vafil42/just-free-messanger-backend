import { Type } from '@nestjs/common';
import { SchemaFactory } from '@nestjs/mongoose';

export const createSchema = (Class: Type<any>) => {
  return SchemaFactory.createForClass(Class).set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (_, ret) => {
      ret.id = ret._id;
      delete ret._id;
    },
  });
};
