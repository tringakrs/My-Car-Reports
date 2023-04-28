import { CanActivate, ExecutionContext } from '@nestjs/common';
import * as request from 'supertest';

export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    return request.session.userId;
  }
}
