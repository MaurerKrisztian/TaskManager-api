import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
export const User = createParamDecorator(
    (data: unknown, context: ExecutionContext): IUser | undefined => {
        const request = context.switchToHttp().getRequest<Request & {user: IUser}>();
        return request.user;
    },
);

export interface IUser {
  id: string;
  username: string;
  password: string;
  // roles: UserRole[];
}
