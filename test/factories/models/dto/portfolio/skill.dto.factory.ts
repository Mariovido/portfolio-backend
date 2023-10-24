import { SkillPortfolioDto } from '../../../../../src/models/dto/portfolio/skill-portfolio.dto';
import { Skill } from '../../../../../src/repositories/entities/skill.entity';

export class SkillPortfolioDtoFactory {
  static build(mockSkill: Skill): SkillPortfolioDto {
    const skillPortfolioDto = new SkillPortfolioDto();
    skillPortfolioDto.id = mockSkill.id;
    skillPortfolioDto.name = mockSkill.skillName;
    skillPortfolioDto.progress = mockSkill.rating;

    return skillPortfolioDto;
  }

  static buildList(size: number, mockSkill: Skill): SkillPortfolioDto[] {
    const skillPortfolioDtoList: SkillPortfolioDto[] = [];

    for (let i = 0; i < size; i++) {
      skillPortfolioDtoList.push(this.build(mockSkill));
    }

    return skillPortfolioDtoList;
  }

  static buildListBySkillList(mockSkillList: Skill[]): SkillPortfolioDto[] {
    const skillPortfolioDtoList: SkillPortfolioDto[] = [];

    for (const skill of mockSkillList) {
      skillPortfolioDtoList.push(this.build(skill));
    }

    return skillPortfolioDtoList;
  }
}
