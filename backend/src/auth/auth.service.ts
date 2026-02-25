import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userService: UsersService
    ) {}

    async register( name:string, email: string, password:string, role:string, phone?: string ){
        const existingUser = await this.userService.findByEmail(email);
        if (existingUser) {
            throw new ConflictException('Email already in use');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.userService.create({
            name,
            email,
            password: hashedPassword,
            role,
            phone: phone || '',
        })
        const payLoad = {
            sub: user._id,
            email: user.email,
            role:user.role,
        }
        return {
            access_token: this.jwtService.sign(payLoad),
        }
    }
    
    async login( email: string, password: string ){
        const user = await this.userService.findByEmail(email);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = {
            sub: user._id,
            email: user.email,
            role: user.role,
        }
        return {
            access_token: this.jwtService.sign(payload),
        }
    }
}
