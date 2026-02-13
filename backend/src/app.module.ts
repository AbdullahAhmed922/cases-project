/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { CaseModule } from './case/case.module';
import { JudgeModule } from './judge/judge.module';
import { AssignmentModule } from './assignment/assignment.module';
import { UserRolesController } from './user-roles/user-roles.controller';
import { AdminRolesController } from './admin-roles/admin-roles.controller';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles/roles.guard';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URL || ''),
    UserModule,
    CaseModule,
    JudgeModule,
    AssignmentModule,
    AuthModule,
  ],
  controllers: [AppController, UserRolesController, AdminRolesController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    },
  ],
})
export class AppModule { }
