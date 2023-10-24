import { User } from '../../../../src/repositories/entities/user.entity';
import { WorkExperience } from '../../../../src/repositories/entities/work-experience.entity';
import { BulletPointFactory } from './bullet-point.entity.factory';
import { LinkFactory } from './link.entity.factory';
import { TagFactory } from './tag.entity.factory';

export class WorkExperienceFactory {
  static build(): WorkExperience {
    const workExperience = new WorkExperience();
    workExperience.id = '9b067528-cd53-4913-87a8-1bd5c9f904c8';
    workExperience.role = 'proud';
    workExperience.company = 'follow';
    workExperience.companyLink = 'http://ohfo.tw/galti';

    const startDate = new Date();
    startDate.setFullYear(startDate.getFullYear() - 1);
    workExperience.startDate = startDate;

    workExperience.endDate = new Date();
    workExperience.bulletPoints = BulletPointFactory.buildList(2, true);
    workExperience.links = LinkFactory.buildList(2, { isWorkExperience: true });
    workExperience.tags = TagFactory.buildList(2);
    workExperience.user = new User();

    return workExperience;
  }

  static buildList(size: number): WorkExperience[] {
    const workExperienceList: WorkExperience[] = [];

    for (let i = 0; i < size; i++) {
      workExperienceList.push(this.build());
    }

    return workExperienceList;
  }
}
