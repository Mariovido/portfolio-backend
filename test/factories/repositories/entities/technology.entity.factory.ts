import { Project } from '../../../../src/repositories/entities/project.entity';
import { Technology } from '../../../../src/repositories/entities/technology.entity';

// TODO - RETOCAR
export class TechnologyFactory {
  static build(): Technology {
    const technology = new Technology();
    technology.id = '19831f05-825e-47cd-a9f9-192be3715d1e';
    technology.technologyName = 'Flask';
    technology.project = new Project();

    return technology;
  }

  static buildList(size: number): Technology[] {
    const technologyList: Technology[] = [];

    for (let i = 0; i < size; i++) {
      technologyList.push(this.build());
    }

    return technologyList;
  }
}
