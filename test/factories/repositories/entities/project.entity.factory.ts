import { Project } from '../../../../src/repositories/entities/project.entity';
import { User } from '../../../../src/repositories/entities/user.entity';
import { BulletPointFactory } from './bullet-point.entity.factory';
import { LinkFactory } from './link.entity.factory';
import { TagFactory } from './tag.entity.factory';

export class ProjectFactory {
  static build(): Project {
    const project = new Project();
    project.id = '08b55870-0283-4b3e-bb4c-86311136f67b';
    project.title = 'three';
    project.subtitle = 'pitch';
    project.projectLink = 'http://kopfim.sa/dic';
    project.imageLink = 'http://cusodoso.cy/capnivvu';
    project.date = new Date();
    project.isDisplayed = true;
    project.bulletPoints = BulletPointFactory.buildList(2, false);
    project.links = LinkFactory.buildList(2, { isProject: true });
    project.tags = TagFactory.buildList(2, false);
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
