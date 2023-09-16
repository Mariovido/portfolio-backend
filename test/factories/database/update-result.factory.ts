import { UpdateResult } from 'typeorm';

interface UpdateResultParams {
  raw: any[];
}

export class UpdateResultFactory {
  static build(params?: UpdateResultParams): UpdateResult {
    const updateResult = {
      raw: params.raw,
    } as UpdateResult;

    return updateResult;
  }
}
