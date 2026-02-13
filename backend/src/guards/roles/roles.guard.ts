/* eslint-disable prettier/prettier */

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLE } from './roles.enums';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<ROLE[]>(
      ROLES_KEY,[
        context.getHandler(),
        context.getClass()
      ]
    )
    if(!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest<{ user: { role: ROLE } }>();
    const userRole = request.user.role;
    return requiredRoles.includes(userRole);
  }
}
