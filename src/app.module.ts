import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from './tasks/tasks.module';
import { AuthMiddleware } from './auth/auth.middleware';
import { TasksController } from './tasks/tasks.controller';
import { UserController } from './users/user.controller';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://rishi:rishi2002@cluster0.ualyzwa.mongodb.net/taskmanagement',
    ),
    AuthModule,
    UserModule,
    TasksModule,
  ],
})
// export class AppModule {}
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(TasksController, UserController);
  }
}
