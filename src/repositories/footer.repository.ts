import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ConflictException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Footer } from './entities/footer.entity';
import { CreateFooterDto } from '../models/dto/admin/create-footer.dto';

export class FooterRepository extends Repository<Footer> {
  private logger = new Logger('FooterRepository', { timestamp: true });

  constructor(
    @InjectRepository(Footer)
    private footerRepository: Repository<Footer>,
  ) {
    super(
      footerRepository.target,
      footerRepository.manager,
      footerRepository.queryRunner,
    );
  }

  async findFootersByUserId(userId: string): Promise<Footer> {
    this.logger.verbose(`Finding footers by UserId. UserId: ${userId}`);
    return await this.footerRepository.findOne({
      where: {
        user: { id: userId },
      },
    });
  }

  async createFooter(
    id: string,
    createFooterDto: CreateFooterDto,
  ): Promise<Footer> {
    const { user } = createFooterDto;
    this.logger.verbose(`Creating new contact entity for user. ID: ${id}`);

    const footer = this.footerRepository.create({
      user: { id: user },
    });

    try {
      return await this.footerRepository.save(footer);
    } catch (error) {
      this.logger.error(error);
      if (error.code === '23505')
        throw new ConflictException('Footer already exists');
      else throw new InternalServerErrorException();
    }
  }
}
