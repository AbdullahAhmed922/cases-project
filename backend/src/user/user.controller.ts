/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, Put, Patch, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesGuard } from 'src/guards/roles/roles.guard';
import { ROLE } from 'src/guards/roles/roles.enums';
import { Roles } from 'src/guards/roles/roles.decorator';

@Controller('user')
@UseGuards(RolesGuard)
export class UserController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    @Roles(ROLE.ADMIN, ROLE.JUDGE)
    findAll() {
        return this.usersService.findAll()
    }

    @Get(':id')
    @Roles(ROLE.ADMIN, ROLE.JUDGE)
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(id)
    }

    @Post()
    @Roles(ROLE.ADMIN)
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto)
    }

    @Put(':id')
    @Roles(ROLE.ADMIN)
    update(@Param('id') id: string, @Body() updateUserDto: Partial<CreateUserDto>) {
        return this.usersService.update(id, updateUserDto)
    }

    @Patch(':id')
    @Roles(ROLE.ADMIN)
    patch(@Param('id') id: string, @Body() patchUserDto: Partial<CreateUserDto> = { name: '', email: '' }) {
        return this.usersService.patch(id, patchUserDto)
    }

    @Delete(':id')
    @Roles(ROLE.ADMIN)
    remove(@Param('id') id: string) {
        return this.usersService.remove(id)
    }
}
