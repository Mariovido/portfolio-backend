import { Project } from '../../../../src/repositories/entities/project.entity';
import { Tag } from '../../../../src/repositories/entities/tag.entity';
import { WorkExperience } from '../../../../src/repositories/entities/work-experience.entity';

export class TagFactory {
  static build(isWorkExperience: boolean): Tag {
    const tag = new Tag();
    tag.id = '9b067528-cd53-4913-87a8-1bd5c9f904c8';
    tag.tag = 'proud';
    if (isWorkExperience) tag.workExperience = new WorkExperience();
    else tag.project = new Project();

    return tag;
  }

  static buildList(size: number, isWorkExperience: boolean): Tag[] {
    const tagList: Tag[] = [];

    for (let i = 0; i < size; i++) {
      tagList.push(this.build(isWorkExperience));
    }

    return tagList;
  }
}
