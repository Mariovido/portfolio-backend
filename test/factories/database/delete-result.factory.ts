import { DeleteResult, UpdateResult } from 'typeorm';

interface DeleteResultsParams {
  affected: number;
}

export class DeleteResultFactory {
  static build(params?: DeleteResultsParams): DeleteResult {
    const deleteResult = {
      affected: params.affected,
    } as UpdateResult;

    return deleteResult;
  }
}
