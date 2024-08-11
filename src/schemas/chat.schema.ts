import { Prop, Schema } from '@nestjs/mongoose';
import { User } from './user.schema';
import mongoose, { HydratedDocument } from 'mongoose';
import { createSchema } from 'src/utils/schema';

@Schema()
export class Chat {
  @Prop({ virtual: true })
  id: string;

  @Prop({
    required: true,
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  })
  users: User;
}

export type ChatDocument = HydratedDocument<Chat>;
export const ChatSchema = createSchema(Chat);
