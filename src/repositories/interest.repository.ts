import { Repository } from 'typeorm';
import { Interest } from './entities/interest.entity';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateInterestDto } from '../models/dto/admin/create-interest.dto';
import { UpdateInterestDto } from '../models/dto/admin/update-interest.dto';

export class InterestRepository extends Repository<Interest> {
  private logger = new Logger('InterestRepository', { timestamp: true });

  constructor(
    @InjectRepository(Interest)
    private interestRepository: Repository<Interest>,
  ) {
    super(
      interestRepository.target,
      interestRepository.manager,
      interestRepository.queryRunner,
    );
  }

  async findInterestByUserId(userId: string): Promise<Interest[]> {
    this.logger.verbose(`Finding interest by UserId. UserId: ${userId}`);
    return await this.interestRepository.find({
      where: {
        user: { id: userId },
      },
    });
  }

  async createInterest(
    id: string,
    createInterestDto: CreateInterestDto,
  ): Promise<Interest> {
    const { interestName } = createInterestDto;
    this.logger.verbose(`Creating new interest entity for user. ID: ${id}`);

    const interest = this.interestRepository.create({
      interestName,
      user: { id },
    });

    return await this.interestRepository.save(interest);
  }

  async updateInterest(
    interest: Interest,
    updateInterestDto: UpdateInterestDto,
  ): Promise<Interest> {
    this.logger.verbose(
      `Updating a interest. ID: ${interest.id}, Data: ${JSON.stringify(
        updateInterestDto,
      )}`,
    );
    try {
      const response = (
        await this.interestRepository
          .createQueryBuilder()
          .update(Interest)
          .set(updateInterestDto)
          .where('id = :id', {
            id: interest.id,
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
