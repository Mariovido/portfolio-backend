import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Skill } from './entities/skill.entity';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateSkillDto } from '../models/dto/admin/create-skill.dto';
import { UpdateSkillDto } from '../models/dto/admin/update-skill.dto';

export class SkillRepository extends Repository<Skill> {
  private logger = new Logger('SkillRepository', { timestamp: true });

  constructor(
    @InjectRepository(Skill)
    private skillRepository: Repository<Skill>,
  ) {
    super(
      skillRepository.target,
      skillRepository.manager,
      skillRepository.queryRunner,
    );
  }

  async findSkillsByUserId(userId: string): Promise<Skill[]> {
    this.logger.verbose(`Finding skills by UserId. UserId: ${userId}`);
    return await this.skillRepository.find({
      where: {
        user: { id: userId },
      },
    });
  }

  async createSkill(
    id: string,
    createSkillDto: CreateSkillDto,
  ): Promise<Skill> {
    const { skillName, level, rating } = createSkillDto;
    this.logger.verbose(`Creating new skill entity for user. ID: ${id}`);

    const skill = this.skillRepository.create({
      skillName,
      level,
      rating,
      user: { id },
    });

    return await this.skillRepository.save(skill);
  }

  async updateSkill(
    skill: Skill,
    updateSkillDto: UpdateSkillDto,
  ): Promise<Skill> {
    this.logger.verbose(
      `Updating a skill. ID: ${skill.id}, Data: ${JSON.stringify(
        updateSkillDto,
      )}`,
    );
    try {
      const response = (
        await this.skillRepository
          .createQueryBuilder()
          .update(Skill)
          .set(updateSkillDto)
          .where('id = :id', {
            id: skill.id,
          })
          .returning('*')
          .execute()
      ).raw[0];

      const result = {
        ...response,
        user: { id: response.userId },
      };
      delete result.userId;

      return result;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }
}
