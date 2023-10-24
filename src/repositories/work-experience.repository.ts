import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkExperience } from './entities/work-experience.entity';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateWorkExperienceDto } from '../models/dto/admin/create-work-experience.dto';
import { UpdateWorkExperienceDto } from '../models/dto/admin/update-work-experience.dto';

export class WorkExperienceRepository extends Repository<WorkExperience> {
  private logger = new Logger('WorkExperienceRepository', { timestamp: true });

  constructor(
    @InjectRepository(WorkExperience)
    private workExperienceRepository: Repository<WorkExperience>,
  ) {
    super(
      workExperienceRepository.target,
      workExperienceRepository.manager,
      workExperienceRepository.queryRunner,
    );
  }

  async findWorkExperienceByUserId(userId: string): Promise<WorkExperience[]> {
    this.logger.verbose(`Finding work experience by UserId. UserId: ${userId}`);
    return await this.workExperienceRepository.find({
      where: {
        user: { id: userId },
      },
      order: {
        startDate: 'DESC',
      },
    });
  }

  async createWorkExperience(
    id: string,
    createWorkExperienceDto: CreateWorkExperienceDto,
  ): Promise<WorkExperience> {
    const { role, company, companyLink, startDate, endDate } =
      createWorkExperienceDto;
    this.logger.verbose(
      `Creating new work experience entity for user. ID: ${id}`,
    );

    const workExperience = this.workExperienceRepository.create({
      role,
      company,
      companyLink,
      startDate,
      endDate,
      user: { id },
    });

    return await this.workExperienceRepository.save(workExperience);
  }

  async updateWorkExperience(
    workExperience: WorkExperience,
    updateWorkExperienceDto: UpdateWorkExperienceDto,
  ): Promise<WorkExperience> {
    this.logger.verbose(
      `Updating an work experience. ID: ${
        workExperience.id
      }, Data: ${JSON.stringify(updateWorkExperienceDto)}`,
    );
    try {
      const response = (
        await this.workExperienceRepository
          .createQueryBuilder()
          .update(WorkExperience)
          .set(updateWorkExperienceDto)
          .where('id = :id', {
            id: workExperience.id,
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
