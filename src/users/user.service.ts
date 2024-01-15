// src/users/user.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.entity';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getUserById(userId: string): Promise<UserDocument | null> {
    // Retrieve user data by user ID
    return await this.userModel
      .findById(userId)
      .populate('tasks')
      .populate('completedTasks');
  }

  async updateUser(
    userId: string,
    updateUserData: any,
  ): Promise<UserDocument | null> {
    // Update user data by user ID
    const updatedUser = await this.userModel
      .findByIdAndUpdate(userId, updateUserData, { new: true })
      .populate('tasks')
      .populate('completedTasks');

    if (!updatedUser) {
      throw new BadRequestException('User not found');
    }

    return updatedUser;
  }
}
