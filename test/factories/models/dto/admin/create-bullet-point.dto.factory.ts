import { CreateBulletPointDto } from '../../../../../src/models/dto/admin/create-bullet-point.dto';

export class CreateBulletPointDtoFactory {
  static build(isWorkExperience: boolean): CreateBulletPointDto {
    const createBulletPointDto = new CreateBulletPointDto();
    createBulletPointDto.bulletPoint = 'Developed a web application';
    if (isWorkExperience)
      createBulletPointDto.workExperience =
        '9b067528-cd53-4913-87a8-1bd5c9f904c8';
    else createBulletPointDto.project = '4f8d94aa-a7c8-485d-9c7f-e71cc5423ab3';

    return createBulletPointDto;
  }
}
