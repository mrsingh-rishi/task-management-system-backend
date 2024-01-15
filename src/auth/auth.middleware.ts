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
      console.log('Token not found');
      res.status(401).send();
      return;
    }

    // Extract the token from the "Bearer" format
    const [, tokenValue] = token.split(' ');

    try {
      // Verify and decode the token
      const decodedToken = jwt.verify(tokenValue, 'shhhhh_RISHI_SINGH');

      // Attach the decoded token to the request for later use in controllers
      req['user'] = decodedToken;
      next();
    } catch (error) {
      // console.error('Token verification failed:', error.message);
      res.status(401).send();
    }
  }
}
