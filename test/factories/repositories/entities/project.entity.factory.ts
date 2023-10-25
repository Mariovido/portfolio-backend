import { Project } from '../../../../src/repositories/entities/project.entity';
import { User } from '../../../../src/repositories/entities/user.entity';
import { BulletPointFactory } from './bullet-point.entity.factory';
// import { TechnologyFactory } from './technology.entity.factory';

// TODO - RETOCAR
export class ProjectFactory {
  static build(): Project {
    const project = new Project();
    project.id = '08b55870-0283-4b3e-bb4c-86311136f67b';
    project.projectName = 'three';
    // project.technologies = TechnologyFactory.buildList(2);
    project.bulletPoints = BulletPointFactory.buildList(2, false);
    project.user = new User();

    return project;
  }

  static buildList(size: number): Project[] {
    const projectList: Project[] = [];

    for (let i = 0; i < size; i++) {
      projectList.push(this.build());
    }

    return projectList;
  }
}
