import { CreateTechnologyDto } from '../../../../src/models/dto/admin/create-technology.dto';
import { UpdateTechnologyDto } from '../../../../src/models/dto/admin/update-technology.dto';
import { TechnologyDto } from '../../../../src/models/dto/technology.dto';
import { Technology } from '../../../../src/repositories/entities/technology.entity';

export class TechnologyDtoFactory {
  static build(
    mockTechnology: Technology,
    mockTechnologyUpdateDto?: CreateTechnologyDto | UpdateTechnologyDto,
  ): TechnologyDto {
    const technologyDto = new TechnologyDto();
    technologyDto.id = mockTechnology.id;
    technologyDto.technologyName = mockTechnologyUpdateDto
      ? mockTechnologyUpdateDto.technologyName
      : mockTechnology.technologyName;
    if (mockTechnologyUpdateDto instanceof CreateTechnologyDto)
      technologyDto.project = mockTechnologyUpdateDto.project;
    else technologyDto.project = mockTechnology.project.id;

    return technologyDto;
  }

  static buildList(size: number, mockTechnology: Technology): TechnologyDto[] {
    const technologyDtoList: TechnologyDto[] = [];

    for (let i = 0; i < size; i++) {
      technologyDtoList.push(this.build(mockTechnology));
    }

    return technologyDtoList;
  }

  static buildListByTechnologyList(
    mockTechnologyList: Technology[],
  ): TechnologyDto[] {
    const technologyDtoList: TechnologyDto[] = [];

    for (const technology of mockTechnologyList) {
      technologyDtoList.push(this.build(technology));
    }

    return technologyDtoList;
  }
}
