import { CreateLinkDto } from '../../../../src/models/dto/admin/create-link.dto';
import { UpdateLinkDto } from '../../../../src/models/dto/admin/update-link.dto';
import { LinkDto } from '../../../../src/models/dto/link.dto';
import { Link } from '../../../../src/repositories/entities/link.entity';

export class LinkDtoFactory {
  static build(
    mockLink: Link,
    mockLinkUpdateDto?: CreateLinkDto | UpdateLinkDto,
  ): LinkDto {
    const linkDto = new LinkDto();
    linkDto.id = mockLink.id;
    linkDto.tag = mockLinkUpdateDto ? mockLinkUpdateDto.tag : mockLink.tag;
    linkDto.name = mockLinkUpdateDto ? mockLinkUpdateDto.name : mockLink.name;
    linkDto.link = mockLinkUpdateDto ? mockLinkUpdateDto.link : mockLink.link;
    linkDto.target = mockLinkUpdateDto
      ? mockLinkUpdateDto.target
      : mockLink.target;
    if (mockLinkUpdateDto instanceof CreateLinkDto) {
      linkDto.workExperience = mockLinkUpdateDto.workExperience;
      linkDto.paragraph = mockLinkUpdateDto.paragraph;
      linkDto.contact = mockLinkUpdateDto.contact;
    } else {
      linkDto.workExperience = mockLink.workExperience?.id;
      linkDto.paragraph = mockLink.paragraph?.id;
      linkDto.contact = mockLink.contact?.id;
    }

    return linkDto;
  }

  static buildList(size: number, mockLink: Link): LinkDto[] {
    const linkDtoList: LinkDto[] = [];

    for (let i = 0; i < size; i++) {
      linkDtoList.push(this.build(mockLink));
    }

    return linkDtoList;
  }

  static buildListByLinkList(mockLinkList: Link[]): LinkDto[] {
    const linkDtoList: LinkDto[] = [];

    for (const link of mockLinkList) {
      linkDtoList.push(this.build(link));
    }

    return linkDtoList;
  }
}
