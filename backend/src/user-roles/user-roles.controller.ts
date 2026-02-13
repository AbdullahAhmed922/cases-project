/* eslint-disable prettier/prettier */
import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles } from 'src/guards/roles/roles.decorator';
import { ROLE } from 'src/guards/roles/roles.enums';
import { RolesGuard } from 'src/guards/roles/roles.guard';

@Controller('user-roles')
export class UserRolesController {
    @Get('user')
    @UseGuards(RolesGuard)
    @Roles(ROLE.USER)
    getUserData() {
        return { message: 'This data is only accessible to users.' };
    }
}
