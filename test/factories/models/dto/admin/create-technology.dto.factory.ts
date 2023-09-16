import { CreateTechnologyDto } from '../../../../../src/models/dto/admin/create-technology.dto';

export class CreateTechnologyDtoFactory {
  static build(): CreateTechnologyDto {
    const createTechnologyDto = new CreateTechnologyDto();
    createTechnologyDto.technologyName = 'Typescript';
    createTechnologyDto.project = '4f8d94aa-a7c8-485d-9c7f-e71cc5423ab3';

    return createTechnologyDto;
  }
}
