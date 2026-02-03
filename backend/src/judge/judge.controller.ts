/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { JudgeService } from './judge.service';
import { CreateJudgeDto } from './dto/create-judge.dto';

@Controller('judge')
export class JudgeController {
    constructor(private readonly judgeService: JudgeService) {}

    @Get()
    findAll(){
        return this.judgeService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id:string){
        return this.judgeService.findOne(id);
    }

    @Post()
    create(@Body() createJudgeDto: CreateJudgeDto){
        return this.judgeService.create(createJudgeDto);
    }

    @Put(':id')
    update(@Param('id') id:string,@Body() createJudgeDto: CreateJudgeDto){
        return this.judgeService.update(id, createJudgeDto);
    }

    @Patch(':id')
    patch(@Param('id') id:string,@Body() createJudgeDto: CreateJudgeDto){
        return this.judgeService.patch(id, createJudgeDto);
    }

    @Delete(':id')
    remove(@Param('id') id:string){
        return this.judgeService.remove(id);
    }
}
