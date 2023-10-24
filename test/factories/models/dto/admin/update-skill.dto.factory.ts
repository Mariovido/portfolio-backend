import { UpdateSkillDto } from '../../../../../src/models/dto/admin/update-skill.dto';

export class UpdateSkillDtoFactory {
  static build(): UpdateSkillDto {
    const updateSkillDto = new UpdateSkillDto();
    updateSkillDto.skillName = 'An old skill';
    updateSkillDto.rating = 33;

    return updateSkillDto;
  }
}
