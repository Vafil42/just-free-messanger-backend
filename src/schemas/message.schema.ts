import { Prop, Schema } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { createSchema } from 'src/utils/schema';

@Schema()
export class Message {
  @Prop({ virtual: true })
  id: string;

  @Prop({ required: true })
  text: string;
}

export type MessageDocument = HydratedDocument<Message>;
export const MessageSchema = createSchema(Message);
