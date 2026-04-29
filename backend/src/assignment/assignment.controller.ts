/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Patch, Post, Delete, Req, UseGuards } from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assingment.dto';
import { Roles } from 'src/guards/roles/roles.decorator';
import { ROLE } from 'src/guards/roles/roles.enums';
import { RolesGuard } from 'src/guards/roles/roles.guard';

@Controller('assignment')
@UseGuards(RolesGuard)
export class AssignmentController {
  constructor(private readonly assignmentService: AssignmentService) {}

  @Post()
  @Roles(ROLE.ADMIN)
  create(@Body() createAssignmentDto: CreateAssignmentDto) {
    return this.assignmentService.create(createAssignmentDto);
  }

  @Get()
  @Roles(ROLE.ADMIN, ROLE.JUDGE)
  findAll() {
    return this.assignmentService.findAll();
  }

  @Get('my-assignments')
  @Roles(ROLE.USER)
  findMyAssignments(@Req() req: any) {
    const user = req.user as { userId: string; email: string; role: string };
    return this.assignmentService.findByUserId(user.userId);
  }

  @Get(':id')
  @Roles(ROLE.ADMIN, ROLE.JUDGE, ROLE.USER)
  findOne(@Param('id') id: string) {
    return this.assignmentService.findOne(id);
  }

  @Patch(':id')
  @Roles(ROLE.ADMIN)
  update(
    @Param('id') id: string,
    @Body() updateAssignmentDto: UpdateAssignmentDto,
  ) {
    return this.assignmentService.update(id, updateAssignmentDto);
  }

  @Delete(':id')
  @Roles(ROLE.ADMIN)
  remove(@Param('id') id: string) {
    return this.assignmentService.remove(id);
  }
}
