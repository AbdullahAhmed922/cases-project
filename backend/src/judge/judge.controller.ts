/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { JudgeService } from './judge.service';
import { CreateJudgeDto } from './dto/create-judge.dto';
import { RolesGuard } from 'src/guards/roles/roles.guard';
import { ROLE } from 'src/guards/roles/roles.enums';
import { Roles } from 'src/guards/roles/roles.decorator';

@Controller('judge')
@UseGuards(RolesGuard)
export class JudgeController {
    constructor(private readonly judgeService: JudgeService) {}

    @Get()
    @Roles(ROLE.ADMIN, ROLE.JUDGE)
    findAll(){
        return this.judgeService.findAll();
    }

    @Get(':id')
    @Roles(ROLE.ADMIN, ROLE.JUDGE)
    findOne(@Param('id') id:string){
        return this.judgeService.findOne(id);
    }

    @Post()
    @Roles(ROLE.ADMIN)
    create(@Body() createJudgeDto: CreateJudgeDto){
        return this.judgeService.create(createJudgeDto);
    }

    @Put(':id')
    @Roles(ROLE.ADMIN)
    update(@Param('id') id:string,@Body() createJudgeDto: CreateJudgeDto){
        return this.judgeService.update(id, createJudgeDto);
    }

    @Patch(':id')
    @Roles(ROLE.ADMIN)
    patch(@Param('id') id:string,@Body() createJudgeDto: CreateJudgeDto){
        return this.judgeService.patch(id, createJudgeDto);
    }

    @Delete(':id')
    @Roles(ROLE.ADMIN)
    remove(@Param('id') id:string){
        return this.judgeService.remove(id);
    }
}
