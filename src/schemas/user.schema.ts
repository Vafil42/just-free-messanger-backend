import { Prop, Schema } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { createSchema } from 'src/utils/schema';
import { Chat } from './chat.schema';

@Schema()
export class User {
  @Prop({ virtual: true })
  id: string;

  @Prop({ requered: true, unique: true })
  username: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    default: [],
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chat' }],
  })
  chats: Chat[];
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = createSchema(User);
