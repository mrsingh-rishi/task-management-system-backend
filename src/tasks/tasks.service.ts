// tasks.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskEntity, TaskDocument } from './tasks.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(TaskEntity.name)
    private readonly taskModel: Model<TaskDocument>,
  ) {}

  async createTask(createTaskPayload: any): Promise<TaskEntity> {
    const createdTask = new this.taskModel(createTaskPayload);
    return createdTask.save();
  }

  async getAllTasks(): Promise<TaskEntity[]> {
    return this.taskModel.find().exec();
  }

  async updateTask(
    taskId: string,
    updateTaskPayload: any,
  ): Promise<TaskEntity | null> {
    const updatedTask = await this.taskModel
      .findByIdAndUpdate(taskId, updateTaskPayload, { new: true })
      .exec();
    return updatedTask;
  }
}
