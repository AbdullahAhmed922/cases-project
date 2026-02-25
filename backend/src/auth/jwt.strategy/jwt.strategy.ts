import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

interface JwtPayload {
  sub: string;
  email: string;
  role: 'admin' | 'judge' | 'user';
}

@Injectable()   
export class JwtStrategy extends PassportStrategy(Strategy) {
    
    constructor(private config: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.get<string>('JWT_SECRET', 'jwt_secret_key'),
        });
    }
    async validate(payload: JwtPayload) {
        return { userId: payload.sub, email: payload.email, role: payload.role };
    }
}
