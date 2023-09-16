import { CreateBulletPointDto } from '../../../../src/models/dto/admin/create-bullet-point.dto';
import { UpdateBulletPointDto } from '../../../../src/models/dto/admin/update-bullet-point.dto';
import { BulletPointDto } from '../../../../src/models/dto/bullet-point.dto';
import { BulletPoint } from '../../../../src/repositories/entities/bullet-point.entity';

export class BulletPointDtoFactory {
  static build(
    mockBulletPoint: BulletPoint,
    mockBulletPointUpdateDto?: CreateBulletPointDto | UpdateBulletPointDto,
  ): BulletPointDto {
    const bulletPointDto = new BulletPointDto();
    bulletPointDto.id = mockBulletPoint.id;
    bulletPointDto.bulletPoint = mockBulletPointUpdateDto
      ? mockBulletPointUpdateDto.bulletPoint
      : mockBulletPoint.bulletPoint;
    if (mockBulletPointUpdateDto instanceof CreateBulletPointDto) {
      bulletPointDto.workExperience = mockBulletPointUpdateDto.workExperience;
      bulletPointDto.project = mockBulletPointUpdateDto.project;
    } else {
      bulletPointDto.workExperience = mockBulletPoint.workExperience?.id;
      bulletPointDto.project = mockBulletPoint.project?.id;
    }

    return bulletPointDto;
  }

  static buildList(
    size: number,
    mockBulletPoint: BulletPoint,
  ): BulletPointDto[] {
    const bulletPointDtoList: BulletPointDto[] = [];

    for (let i = 0; i < size; i++) {
      bulletPointDtoList.push(this.build(mockBulletPoint));
    }

    return bulletPointDtoList;
  }

  static buildListByBulletPointList(
    mockBulletPointList: BulletPoint[],
  ): BulletPointDto[] {
    const bulletPointDtoList: BulletPointDto[] = [];

    for (const bulletPoint of mockBulletPointList) {
      bulletPointDtoList.push(this.build(bulletPoint));
    }

    return bulletPointDtoList;
  }
}
