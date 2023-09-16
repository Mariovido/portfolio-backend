import { WorkExperienceTotal } from '../../src/models/interfaces/work-experience-total.interface';
import { WorkExperience } from '../../src/repositories/entities/work-experience.entity';
import { calculateWorkExperience } from '../../src/utils/portfolio.utils';
import { WorkExperienceTotalFactory } from '../factories/models/interfaces/work-experience-total.interface.factory';
import { WorkExperienceFactory } from '../factories/repositories/entities/work-experience.entity.factory';

describe('PortfolioUtils', () => {
  let mockWorkExperienceList: WorkExperience[];

  let mockWorkExperienceTotal: WorkExperienceTotal;

  beforeEach(() => {
    mockWorkExperienceList = WorkExperienceFactory.buildList(2);

    mockWorkExperienceTotal = WorkExperienceTotalFactory.build();
  });

  describe('calculateWorkExperience', () => {
    it('calls utils class to return the correct object with two work experience -> OK', () => {
      const result = calculateWorkExperience(mockWorkExperienceList);
      expect(result).toEqual(mockWorkExperienceTotal);
    });

    it('calls utils class to return the correct object with only one work experience -> OK', () => {
      mockWorkExperienceList.pop();
      mockWorkExperienceTotal.years = 1;
      const result = calculateWorkExperience(mockWorkExperienceList);
      expect(result).toEqual(mockWorkExperienceTotal);
    });

    it('calls utils class to return the correct object with only one work experience and less than one month -> OK', () => {
      mockWorkExperienceList.pop();
      mockWorkExperienceList[0].startDate.setFullYear(
        mockWorkExperienceList[0].startDate.getFullYear() + 1,
      );
      mockWorkExperienceTotal.years = 0;
      const result = calculateWorkExperience(mockWorkExperienceList);
      expect(result).toEqual(mockWorkExperienceTotal);
    });

    it('calls utils class to return the correct object with two work experience and months greater than 0 -> OK', () => {
      mockWorkExperienceList[0].startDate.setMonth(0);
      mockWorkExperienceTotal.months = new Date().getMonth();
      const result = calculateWorkExperience(mockWorkExperienceList);
      expect(result).toEqual(mockWorkExperienceTotal);
    });

    it('calls utils class to return the correct object with two work experience and both months greather than 0 -> OK', () => {
      mockWorkExperienceList[0].startDate.setMonth(0);
      mockWorkExperienceList[1].startDate.setMonth(0);
      mockWorkExperienceTotal.months = (new Date().getMonth() * 2) % 12;
      mockWorkExperienceTotal.years += Math.floor(
        (new Date().getMonth() * 2) / 12,
      );
      const result = calculateWorkExperience(mockWorkExperienceList);
      expect(result).toEqual(mockWorkExperienceTotal);
    });

    it('calls utils class to return the correct object with two work experience and one endDate null -> OK', () => {
      mockWorkExperienceList[0].endDate = null;
      const result = calculateWorkExperience(mockWorkExperienceList);
      expect(result).toEqual(mockWorkExperienceTotal);
    });
  });
});
