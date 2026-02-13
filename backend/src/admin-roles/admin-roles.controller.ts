/* eslint-disable prettier/prettier */
import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles } from 'src/guards/roles/roles.decorator';
import { ROLE } from 'src/guards/roles/roles.enums';
import { RolesGuard } from 'src/guards/roles/roles.guard';

@Controller('admin-roles')
export class AdminRolesController {
    @Get('admin')
    @UseGuards(RolesGuard)
    @Roles(ROLE.ADMIN)
    getAdminData() {
        return { message: 'This data is only accessible to admins.' };
    } 
    @Get("user")
    getUserData() {
        return { message: 'This data is accessible to all users.' };
    }
}
