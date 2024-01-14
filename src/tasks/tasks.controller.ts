// tasks.controller.ts
import {
  Controller,
  Get,
  Patch,
  Post,
  Body,
  Param,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { AuthMiddleware } from '../auth/auth.middleware'; // Adjust the path accordingly

@Controller('tasks')
@UseGuards(AuthMiddleware)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  // Create a task
  @Post()
  async createTask(@Body() createTaskPayload: any) {
    const createdTask = await this.tasksService.createTask(createTaskPayload);
    return createdTask;
  }

  // Get all tasks
  @Get()
  async getAllTasks() {
    const allTasks = await this.tasksService.getAllTasks();
    return allTasks;
  }

  // Update a task by ID
  @Patch(':id')
  async updateTask(
    @Param('id') taskId: string,
    @Body() updateTaskPayload: any,
  ) {
    const updatedTask = await this.tasksService.updateTask(
      taskId,
      updateTaskPayload,
    );

    if (!updatedTask) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }

    return updatedTask;
  }
}
