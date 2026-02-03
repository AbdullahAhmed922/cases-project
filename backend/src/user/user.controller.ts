/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, Put, Patch, Delete } from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    findAll() {
        return this.usersService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(id)
    }

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto)
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateUserDto: Partial<CreateUserDto>) {
        return this.usersService.update(id, updateUserDto)
    }

    @Patch(':id')
    patch(@Param('id') id: string, @Body() patchUserDto: Partial<CreateUserDto> = { name: '', email: '' }) {
        return this.usersService.patch(id, patchUserDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.remove(id)
    }
}
