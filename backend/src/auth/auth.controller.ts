import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from './roles/roles.guard';
import { Roles } from 'src/guards/roles/roles.decorator';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() body: { email: string, password: string }) {
        return this.authService.login( body.email, body.password );
    }
    @UseGuards(AuthGuard('jwt'))
    @Get('protected')
    getProtectedData(@Request() req) {
        return req.user;
    }

    @UseGuards(AuthGuard('jwt'),RolesGuard)
    @Roles('admin')
    @Get('admin')
    getAdminData(){
        return 'Only admin can access this data';
    }
    @UseGuards(AuthGuard('jwt'),RolesGuard)
    @Roles('judge')
    @Get('judge')
    getJudgeData(){
        return 'Only judge can access this data';
    }
    @UseGuards(AuthGuard('jwt'),RolesGuard)
    @Roles('user')
    @Get('user')
    getUserData(){
        return 'Only user can access this data';
    }

    
}
