import { CallHandler } from '@nestjs/common';
import { of } from 'rxjs';

export class CallHandlerFactory {
  static build<T>(returnValue: T): CallHandler<T> {
    return {
      handle: jest.fn(() => of(returnValue)),
    };
  }
}
