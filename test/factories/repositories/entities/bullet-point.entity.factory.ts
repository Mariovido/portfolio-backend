import { BulletPoint } from '../../../../src/repositories/entities/bullet-point.entity';
import { Project } from '../../../../src/repositories/entities/project.entity';
import { WorkExperience } from '../../../../src/repositories/entities/work-experience.entity';

export class BulletPointFactory {
  static build(isWorkExperience: boolean): BulletPoint {
    const bulletPoint = new BulletPoint();
    bulletPoint.id = '88e4134e-d3c1-47ea-a81b-33c209ebc699';
    bulletPoint.bulletPoint =
      'create eleven key taught experiment trip no throat began necessary did parts alone declared thirty listen row gently mainly square widely skill potatoes rather';
    if (isWorkExperience) bulletPoint.workExperience = new WorkExperience();
    else bulletPoint.project = new Project();

    return bulletPoint;
  }

  static buildList(size: number, isWorkExperience: boolean): BulletPoint[] {
    const bulletPointList: BulletPoint[] = [];

    for (let i = 0; i < size; i++) {
      bulletPointList.push(this.build(isWorkExperience));
    }

    return bulletPointList;
  }
}
