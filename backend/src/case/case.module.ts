/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { Case, CaseSchema } from './case.schema';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { CaseService } from './case.service';
import { CaseController } from './case.controller';

@Module({
     imports: [
    MongooseModule.forFeature([{name:Case.name , schema: CaseSchema}])
  ],
  controllers: [CaseController],
  providers: [CaseService],
})
export class CaseModule {}
