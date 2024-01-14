// src/users/user.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { TaskEntity } from '../tasks/tasks.entity';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'TaskEntity' }],
    default: [],
  })
  tasks: TaskEntity[]; // Assuming tasks will be stored as IDs

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'TaskEntity' }],
    default: [],
  })
  completedTasks: TaskEntity[]; // Assuming completed tasks will be stored as IDs
}

export const UserSchema = SchemaFactory.createForClass(User);
