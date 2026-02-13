/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CaseService } from './case.service';
import { UpdateCaseDto } from './dto/update-case.dto';
import { CreateCaseDto } from './dto/create-case.dto';
import { Roles } from 'src/guards/roles/roles.decorator';
import { ROLE } from 'src/guards/roles/roles.enums';
import { RolesGuard } from 'src/guards/roles/roles.guard';

@Controller('case')
@UseGuards(RolesGuard)
export class CaseController {
    constructor(private readonly caseService: CaseService) { }

    @Get()
    @Roles(ROLE.ADMIN, ROLE.JUDGE, ROLE.USER)
    findAll() {
        return this.caseService.findAll();
    }

    @Get(':id')
    @Roles(ROLE.ADMIN, ROLE.JUDGE, ROLE.USER)
    findOne(@Param('id') id: string) {
        return this.caseService.findOne(id);
    }

    @Post()
    @Roles(ROLE.ADMIN, ROLE.USER)
    create(@Body() CreateCaseDto: CreateCaseDto) {
        return this.caseService.create(CreateCaseDto);
    }

    @Patch(':id')
    @Roles(ROLE.ADMIN)
    update(@Param('id') id: string, @Body() updateCaseDto: Partial<UpdateCaseDto>) {
        return this.caseService.update(id, updateCaseDto);
    }

    @Patch(':id/status')
    @Roles(ROLE.ADMIN, ROLE.JUDGE, ROLE.USER)
    updateStatus(@Param('id') id: string, @Body() body: { status: string }) {
        return this.caseService.updateStatus(id, body.status);
    }

    @Delete(':id')
    @Roles(ROLE.ADMIN)
    remove(@Param('id') id: string) {
        return this.caseService.remove(id);
    }
}
