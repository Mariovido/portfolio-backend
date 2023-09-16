import { Education } from '../../../../src/repositories/entities/education.entity';
import { User } from '../../../../src/repositories/entities/user.entity';

export class EducationFactory {
  static build(): Education {
    const education = new Education();
    education.id = '1fd7786f-7dda-4f0a-8319-0008b5f55bb0';
    education.courseName = 'distant';
    education.typeOfDegree = 'willing';
    education.institute = 'smile';

    const startDate = new Date();
    startDate.setFullYear(startDate.getFullYear() - 1);
    education.startDate = startDate;

    education.endDate = new Date();
    education.grade = 9.25;
    education.user = new User();

    return education;
  }

  static buildList(size: number): Education[] {
    const educationList: Education[] = [];

    for (let i = 0; i < size; i++) {
      educationList.push(this.build());
    }

    return educationList;
  }
}
