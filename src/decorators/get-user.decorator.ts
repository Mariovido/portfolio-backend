import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from '../repositories/entities/user.entity';

export const getUserDecoratorFunction = (
  _data,
  ctx: ExecutionContext,
): User => {
  const req = ctx.switchToHttp().getRequest();
  return req?.user;
};

export const GetUser = createParamDecorator((data, ctx: ExecutionContext) =>
  getUserDecoratorFunction(data, ctx),
);
