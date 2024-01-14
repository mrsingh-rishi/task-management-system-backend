// tasks/task.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '../users/user.entity';

export type TaskDocument = TaskEntity & Document;

@Schema()
export class TaskEntity {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ enum: ['todo', 'in progress', 'completed'], default: 'todo' })
  status: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'User',
  })
  assigned: User;

  @Prop({ enum: ['high', 'medium', 'low'], default: 'medium' })
  priority: string;
}

export const TaskSchema = SchemaFactory.createForClass(TaskEntity);
