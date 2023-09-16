import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Education } from './entities/education.entity';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateEducationDto } from '../models/dto/admin/create-education.dto';
import { UpdateEducationDto } from '../models/dto/admin/update-education.dto';

export class EducationRepository extends Repository<Education> {
  private logger = new Logger('EducationRepository', { timestamp: true });

  constructor(
    @InjectRepository(Education)
    private educationRepository: Repository<Education>,
  ) {
    super(
      educationRepository.target,
      educationRepository.manager,
      educationRepository.queryRunner,
    );
  }

  async findEducationByUserId(userId: string): Promise<Education[]> {
    this.logger.verbose(`Finding education by UserId. UserId: ${userId}`);
    return await this.educationRepository.find({
      where: {
        user: { id: userId },
      },
      order: {
        startDate: 'DESC',
      },
    });
  }

  async createEducation(
    id: string,
    createEducationDto: CreateEducationDto,
  ): Promise<Education> {
    const { courseName, typeOfDegree, institute, startDate, endDate, grade } =
      createEducationDto;
    this.logger.verbose(`Creating new education entity for user. ID: ${id}`);

    const education = this.educationRepository.create({
      courseName,
      typeOfDegree,
      institute,
      startDate,
      endDate,
      grade,
      user: { id },
    });

    return await this.educationRepository.save(education);
  }

  async updateEducation(
    education: Education,
    updateEducationDto: UpdateEducationDto,
  ): Promise<Education> {
    this.logger.verbose(
      `Updating an education. ID: ${education.id}, Data: ${JSON.stringify(
        updateEducationDto,
      )}`,
    );
    try {
      const response = (
        await this.educationRepository
          .createQueryBuilder()
          .update(Education)
          .set(updateEducationDto)
          .where('id = :id', {
            id: education.id,
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
