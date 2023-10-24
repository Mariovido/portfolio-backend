import { CreateSkillDto } from '../../../../../src/models/dto/admin/create-skill.dto';

export class CreateSkillDtoFactory {
  static build(): CreateSkillDto {
    const createSkillDto = new CreateSkillDto();
    createSkillDto.skillName = 'A new skill';
    createSkillDto.rating = 88;

    return createSkillDto;
  }
}
