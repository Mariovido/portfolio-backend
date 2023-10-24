import { UpdateTechnologyDto } from '../../../../../src/models/dto/admin/update-technology.dto';

// TODO - RETOCAR
export class UpdateTechnologyDtoFactory {
  static build(): UpdateTechnologyDto {
    const updateTechnologyDto = new UpdateTechnologyDto();
    updateTechnologyDto.technologyName = 'React';

    return updateTechnologyDto;
  }
}
