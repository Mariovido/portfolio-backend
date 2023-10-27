import { CreateTagDto } from '../../../../src/models/dto/admin/create-tag.dto';
import { UpdateTagDto } from '../../../../src/models/dto/admin/update-tag.dto';
import { TagDto } from '../../../../src/models/dto/tag.dto';
import { Tag } from '../../../../src/repositories/entities/tag.entity';

export class TagDtoFactory {
  static build(
    mockTag: Tag,
    mockTagUpdateDto?: CreateTagDto | UpdateTagDto,
  ): TagDto {
    const tagDto = new TagDto();
    tagDto.id = mockTag.id;
    tagDto.tag = mockTagUpdateDto ? mockTagUpdateDto.tag : mockTag.tag;
    if (mockTagUpdateDto instanceof CreateTagDto) {
      tagDto.workExperience = mockTagUpdateDto.workExperience;
      tagDto.project = mockTagUpdateDto.project;
    } else {
      tagDto.workExperience = mockTag.workExperience?.id;
      tagDto.project = mockTag.project?.id;
    }

    return tagDto;
  }

  static buildList(size: number, mockTag: Tag): TagDto[] {
    const tagDtoList: TagDto[] = [];

    for (let i = 0; i < size; i++) {
      tagDtoList.push(this.build(mockTag));
    }

    return tagDtoList;
  }

  static buildListByTagList(mockTagList: Tag[]): TagDto[] {
    const tagDtoList: TagDto[] = [];

    for (const tag of mockTagList) {
      tagDtoList.push(this.build(tag));
    }

    return tagDtoList;
  }
}
