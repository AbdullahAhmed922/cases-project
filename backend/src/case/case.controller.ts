/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CaseService } from './case.service';
import { UpdateCaseDto } from './dto/update-case.dto';
import { CreateCaseDto } from './dto/create-case.dto';

@Controller('case')
export class CaseController {
    constructor(private readonly caseService: CaseService) { }

    @Get()
    findAll() {
        return this.caseService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.caseService.findOne(id);
    }

    @Post()
    create(@Body() CreateCaseDto: CreateCaseDto) {
        return this.caseService.create(CreateCaseDto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateCaseDto: Partial<UpdateCaseDto>) {
        return this.caseService.update(id, updateCaseDto);
    }

    @Patch(':id/status')
    updateStatus(@Param('id') id: string, @Body() body: { status: string }) {
        return this.caseService.updateStatus(id, body.status);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.caseService.remove(id);
    }
}
