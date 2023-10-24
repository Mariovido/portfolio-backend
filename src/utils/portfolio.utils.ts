import { WorkExperienceTotal } from '../models/interfaces/work-experience-total.interface';
import { WorkExperience } from '../repositories/entities/work-experience.entity';

export const calculateWorkExperience = (
  workExperience: WorkExperience[],
): WorkExperienceTotal => {
  let years = 0;
  let months = 0;

  workExperience.forEach((workExperienceItem) => {
    const workExperienceTotal = getYearAndMonths(
      workExperienceItem.startDate,
      workExperienceItem.endDate,
    );

    years += workExperienceTotal.years;
    months += workExperienceTotal.months;

    if (months >= 12) {
      years++;
      months = months % 12;
    }
  });
  return { years, months };
};

const getYearAndMonths = (
  startDate: Date,
  endDate: Date,
): WorkExperienceTotal => {
  if (!endDate) endDate = new Date();

  const years = endDate.getFullYear() - startDate.getFullYear();
  const months = endDate.getMonth() - startDate.getMonth();

  return { years, months };
};

export const getBetweenDates = (startDate: Date, endDate?: Date): string => {
  const startDateString = startDate.toLocaleString('en-us', {
    month: 'short',
    year: 'numeric',
  });
  const endDateString = endDate
    ? endDate.toLocaleString('en-us', { month: 'short', year: 'numeric' })
    : 'Ongoing';

  return `${startDateString} - ${endDateString}`;
};
