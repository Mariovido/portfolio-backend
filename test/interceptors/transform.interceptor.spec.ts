import { Test } from '@nestjs/testing';
import { TransformInterceptor } from '../../src/interceptors/transform.interceptor';
import { User } from '../../src/repositories/entities/user.entity';
import { UserFactory } from '../factories/repositories/entities/user.entity.factory';
import { CallHandler, ExecutionContext } from '@nestjs/common';
import { ExecutionContextFactory } from '../factories/execution-context.factory';
import { CallHandlerFactory } from '../factories/interceptors/call-handler.factory';
import { instanceToPlain } from 'class-transformer';
import { lastValueFrom } from 'rxjs';

describe('TransformInterceptor', () => {
  let transformInterceptor: TransformInterceptor;

  let mockUser: User;

  let mockExecutionContext: ExecutionContext;

  let mockCallHandler: CallHandler<any>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [TransformInterceptor],
    }).compile();

    transformInterceptor = module.get(TransformInterceptor);

    mockUser = UserFactory.build();

    mockExecutionContext = ExecutionContextFactory.build();

    mockCallHandler = CallHandlerFactory.build(mockUser);
  });

  describe('intercept', () => {
    it('gives a class and returns the plain object -> OK', async () => {
      const result = await lastValueFrom(
        transformInterceptor.intercept(mockExecutionContext, mockCallHandler),
      );
      expect(result).toEqual(instanceToPlain(mockUser));
    });
  });
});
