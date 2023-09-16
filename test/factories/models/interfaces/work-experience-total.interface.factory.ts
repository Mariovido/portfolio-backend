import { WorkExperienceTotal } from '../../../../src/models/interfaces/work-experience-total.interface';

export class WorkExperienceTotalFactory {
  static build(): WorkExperienceTotal {
    const workExperienceTotal: WorkExperienceTotal = {
      years: 2,
      months: 0,
    };

    return workExperienceTotal;
  }
}
