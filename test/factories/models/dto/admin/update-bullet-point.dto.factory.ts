import { UpdateBulletPointDto } from '../../../../../src/models/dto/admin/update-bullet-point.dto';

export class UpdateBulletPointDtoFactory {
  static build(): UpdateBulletPointDto {
    const updateBulletPointDto = new UpdateBulletPointDto();
    updateBulletPointDto.bulletPoint = 'Developed a web platform';

    return updateBulletPointDto;
  }
}
