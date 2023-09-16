import { ExecutionContext } from '@nestjs/common';
import { User } from '../../src/repositories/entities/user.entity';

interface ExecutionContextParams {
  request: {
    user: User;
  };
}

export class ExecutionContextFactory {
  static build(params?: ExecutionContextParams): ExecutionContext {
    const executionContext = {
      switchToHttp: () => ({
        getRequest: () => params?.request,
      }),
    } as ExecutionContext;

    return executionContext;
  }
}
