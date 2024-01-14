import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from './tasks/tasks.module';

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
export class AppModule {}
