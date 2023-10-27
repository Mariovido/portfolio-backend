import { CreateLinkDto } from '../../../../../src/models/dto/admin/create-link.dto';

export class CreateLinkDtoFactory {
  static build({
    isWorkExperience,
    isParagraph,
    isContact,
    isProject,
  }: {
    isWorkExperience?: boolean;
    isParagraph?: boolean;
    isContact?: boolean;
    isProject?: boolean;
  }): CreateLinkDto {
    const createLinkDto = new CreateLinkDto();
    createLinkDto.tag = 'thetag';
    createLinkDto.name = 'linkedin';
    createLinkDto.target = '_blank';
    if (isWorkExperience)
      createLinkDto.workExperience = '6efccabe-1354-485b-b04d-515824afa889';
    if (isParagraph)
      createLinkDto.paragraph = '69272a58-07fd-4c07-9d9a-440ac28b70bc';
    if (isContact)
      createLinkDto.contact = '5c3b428a-8236-4187-8175-3f71fc952af9';
    if (isProject)
      createLinkDto.project = '5c3b428a-8236-4187-8175-3f71fc952af9';

    return createLinkDto;
  }
}
