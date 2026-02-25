import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from './roles/roles.guard';
import { Roles } from './roles.decorator';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @Post('login')
    async login(@Body() body: { email: string, password: string }) {
        return this.authService.login( body.email, body.password );
    }

    @Public()
    @Post('register')
    async register(@Body() body: { name: string, email: string, password: string, role: string, phone?: string }) {
        return this.authService.register( body.name, body.email, body.password, body.role, body.phone)
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
