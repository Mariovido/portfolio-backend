import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import {
  ConflictException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateContactDto } from '../models/dto/admin/create-contact.dto';
import { UpdateContactDto } from '../models/dto/admin/update-contact.dto';

export class ContactRepository extends Repository<Contact> {
  private logger = new Logger('ContactRepository', { timestamp: true });

  constructor(
    @InjectRepository(Contact)
    private contactRepository: Repository<Contact>,
  ) {
    super(
      contactRepository.target,
      contactRepository.manager,
      contactRepository.queryRunner,
    );
  }

  async findContactsByUserId(userId: string): Promise<Contact> {
    this.logger.verbose(`Finding contacts by UserId. UserId: ${userId}`);
    return await this.contactRepository.findOne({
      where: {
        user: { id: userId },
      },
    });
  }

  async createContact(
    id: string,
    createContactDto: CreateContactDto,
  ): Promise<Contact> {
    const { email } = createContactDto;
    this.logger.verbose(`Creating new contact entity for user. ID: ${id}`);

    const contact = this.contactRepository.create({
      email,
      user: { id },
    });

    try {
      return await this.contactRepository.save(contact);
    } catch (error) {
      this.logger.error(error);
      if (error.code === '23505')
        throw new ConflictException('Contact already exists');
      else throw new InternalServerErrorException();
    }
  }

  async updateContact(
    contact: Contact,
    updateContactDto: UpdateContactDto,
  ): Promise<Contact> {
    this.logger.verbose(
      `Updating a contact. ID: ${contact.id}, Data: ${JSON.stringify(
        updateContactDto,
      )}`,
    );
    try {
      const response = (
        await this.contactRepository
          .createQueryBuilder()
          .update(Contact)
          .set(updateContactDto)
          .where('id = :id', {
            id: contact.id,
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
