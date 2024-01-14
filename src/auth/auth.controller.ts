import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Signup
  @Post('signup') // Define a specific route for signup
  async signup(@Body() body) {
    // Call the AuthService method for signup
    const result = await this.authService.signup(body);
    return { token: result };
  }

  // Login
  @Post('login') // Define a specific route for login
  async login(@Body() body) {
    // Call the AuthService method for login
    const result = await this.authService.login(body);
    return { token: result };
  }
}
