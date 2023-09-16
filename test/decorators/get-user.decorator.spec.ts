import { ExecutionContext } from '@nestjs/common';
import { UserFactory } from '../factories/repositories/entities/user.entity.factory';
import { ExecutionContextFactory } from '../factories/execution-context.factory';
import { getUserDecoratorFunction } from '../../src/decorators/get-user.decorator';
import { User } from '../../src/repositories/entities/user.entity';

describe('GetUser', () => {
  let mockUser: User;

  let mockExecutionContext: ExecutionContext;

  beforeEach(async () => {
    mockUser = UserFactory.build();

    mockExecutionContext = ExecutionContextFactory.build({
      request: { user: mockUser },
    });
  });

  describe('getUserDecoratorFunction', () => {
    it('calls the decorator and returns an user. -> OK', () => {
      const result = getUserDecoratorFunction(null, mockExecutionContext);
      expect(result).toEqual(mockUser);
    });

    it('calls the decorator and no user is found so returns undefined. -> KO', () => {
      mockExecutionContext = ExecutionContextFactory.build();
      const result = getUserDecoratorFunction(null, mockExecutionContext);
      expect(result).toBeUndefined();
    });
  });
});
