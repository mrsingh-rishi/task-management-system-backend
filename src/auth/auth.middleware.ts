// auth.middleware.ts
import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization'];

    if (!token) {
      throw new UnauthorizedException('Unauthorized: Token not provided');
    }

    // Extract the token from the "Bearer" format
    const [, tokenValue] = token.split(' ');

    try {
      // Verify and decode the token
      const decodedToken = jwt.verify(tokenValue, 'shhhhh_RISHI_SINGH'); // Replace 'shhhhh_RISHI_SINGH' with your actual secret key

      // Attach the decoded token to the request for later use in controllers
      req['user'] = decodedToken;
      // console.log('Decoded Token:', decodedToken);
      next();
    } catch (error) {
      throw new UnauthorizedException('Unauthorized: Invalid token');
    }
  }
}
