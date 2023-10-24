import { User } from '../../../../src/repositories/entities/user.entity';
import { ContactFactory } from './contact.entity.factory';
import { EducationFactory } from './education.entity.factory';
import { FooterFactory } from './footer.entity.factory';
import { ParagraphFactory } from './paragraph.entity.factory';
import { ProjectFactory } from './project.entity.factory';
import { SkillFactory } from './skill.entity.factory';
import { WorkExperienceFactory } from './work-experience.entity.factory';

export class UserFactory {
  static build(): User {
    const user = new User();
    user.id = 'bf8e7d67-cca0-40bb-ae86-3759fb559602';
    user.username = 'firm';
    user.password = 'Abc1234*';
    user.firstName = 'Marguerite';
    user.lastName = 'Gonzales';
    user.dateOfBirth = new Date();
    user.description =
      'built field hello joined likely sets wheel so laugh slave pile cream imagine successful pattern cow riding lay equipment finger salt creature handsome roof';
    user.about = ParagraphFactory.buildList(2, false);
    user.educations = EducationFactory.buildList(2);
    user.workExperiences = WorkExperienceFactory.buildList(2);
    user.skills = SkillFactory.buildList(2);
    user.projects = ProjectFactory.buildList(2);
    user.contact = ContactFactory.build();
    user.footer = FooterFactory.build();

    return user;
  }

  static buildList(size: number): User[] {
    const usersList: User[] = [];

    for (let i = 0; i < size; i++) {
      usersList.push(this.build());
    }

    return usersList;
  }
}
