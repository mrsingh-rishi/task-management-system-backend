import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/user.entity';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async signup(userData: any): Promise<any> {
    // Check if the user with the provided email already exists
    const existingUser = await this.userModel
      .findOne({ email: userData.email })
      .exec();
    if (existingUser) {
      throw new NotFoundException('User with this email already exists');
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Create a new user
    const newUser = new this.userModel({
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Generate JWT token
    const accessToken = this.generateToken(savedUser);

    // Return the result with the token (you might want to omit sensitive data like the password)
    return accessToken;
  }

  async login(userData: any): Promise<any> {
    // Find the user by email
    const user = await this.userModel.findOne({ email: userData.email }).exec();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(
      userData.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new NotFoundException('Invalid credentials');
    }

    // Generate JWT token
    const accessToken = this.generateToken(user);

    // Return the result with the token
    return accessToken;
  }

  private generateToken(user: UserDocument): string {
    // Create a JWT token with a payload containing user information
    const payload = {
      userId: user._id,
      username: user.name,
      email: user.email,
    };

    // You should use a secure secret key for signing the token
    const secretKey = 'shhhhh_RISHI_SINGH';

    // Sign the token with the secret key and set an expiration time
    const accessToken = jwt.sign(payload, secretKey, { expiresIn: '1h' });

    return accessToken;
  }
}
