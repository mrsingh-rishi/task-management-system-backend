// src/users/user.controller.ts
import {
  Controller,
  Post,
  Body,
  BadRequestException,
  Get,
  Patch,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Get user data by token provided in headers bearer
  @Get()
  async getUserData(@Req() req: any) {
    // Access user data from the request object (if available)
    const userData = req.user;

    // Check if user data is available
    if (!userData) {
      throw new BadRequestException('User data not available');
    }
    // Retrieve additional user data using the user service
    const user = await this.userService.getUserById(userData.userId);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    // Return user data (you might want to omit sensitive data like the password)
    return {
      userId: user._id,
      username: user.name,
      email: user.email,
    };
  }

  // Update user data by token provided in headers bearer
  @Patch()
  async updateUser(@Req() req: any, @Body() updateUserData: any) {
    // Access user data from the request object (if available)
    const userData = req.user;

    // Check if user data is available
    if (!userData) {
      throw new BadRequestException('User data not available');
    }

    // Update user data using the user service
    const updatedUser = await this.userService.updateUser(
      userData.userId,
      updateUserData,
    );

    if (!updatedUser) {
      throw new BadRequestException('Failed to update user');
    }

    // Return updated user data (you might want to omit sensitive data like the password)
    return {
      userId: updatedUser._id,
      username: updatedUser.name,
      email: updatedUser.email,
    };
  }
}
