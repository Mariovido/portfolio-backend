import { Repository } from 'typeorm';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLinkDto } from '../models/dto/admin/create-link.dto';
import { UpdateLinkDto } from '../models/dto/admin/update-link.dto';
import { Link } from './entities/link.entity';
import { Paragraph } from './entities/paragraph.entity';
import { WorkExperience } from './entities/work-experience.entity';
import { Contact } from './entities/contact.entity';

export class LinkRepository extends Repository<Link> {
  private logger = new Logger('LinkRepository', { timestamp: true });

  constructor(
    @InjectRepository(Link)
    private linkRepository: Repository<Link>,
  ) {
    super(
      linkRepository.target,
      linkRepository.manager,
      linkRepository.queryRunner,
    );
  }

  async findLinksByParagraphs(paragraphs: Paragraph[]): Promise<Link[]> {
    this.logger.verbose(`Finding links by paragraphs.`);
    const linkList: Link[] = [];
    for (const paragraph of paragraphs) {
      const link = await this.linkRepository.find({
        where: {
          paragraph: { id: paragraph.id },
        },
      });

      link.forEach((linkAux) => {
        const paragraphAux = new Paragraph();
        paragraphAux.id = paragraph.id;
        linkAux.paragraph = paragraphAux;
        linkList.push(linkAux);
      });
    }

    return linkList;
  }

  async findLinksByWorkExperiences(
    workExperiences: WorkExperience[],
  ): Promise<Link[]> {
    this.logger.verbose(`Finding links by work experiences.`);
    const linkList: Link[] = [];
    for (const workExperience of workExperiences) {
      const link = await this.linkRepository.find({
        where: {
          workExperience: { id: workExperience.id },
        },
      });

      link.forEach((linkAux) => {
        const workExperienceAux = new WorkExperience();
        workExperienceAux.id = workExperience.id;
        linkAux.workExperience = workExperienceAux;
        linkList.push(linkAux);
      });
    }

    return linkList;
  }

  async findLinksByContacts(contacts: Contact): Promise<Link[]> {
    this.logger.verbose(`Finding links by contacts.`);
    const linkList: Link[] = [];
    const link = await this.linkRepository.find({
      where: {
        contact: { id: contacts.id },
      },
    });

    link.forEach((linkAux) => {
      const contactAux = new Contact();
      contactAux.id = contacts.id;
      linkAux.contact = contactAux;
      linkList.push(linkAux);
    });

    return linkList;
  }

  async createLink(id: string, createLinkDto: CreateLinkDto): Promise<Link> {
    const { tag, name, link, target, workExperience, paragraph, contact } =
      createLinkDto;
    this.logger.verbose(`Creating new link entity for user. ID: ${id}`);

    let linkEntity;
    if (paragraph)
      linkEntity = this.linkRepository.create({
        tag,
        name,
        link,
        target,
        paragraph: { id: paragraph },
      });

    if (workExperience)
      linkEntity = this.linkRepository.create({
        tag,
        name,
        link,
        target,
        workExperience: { id: workExperience },
      });

    if (contact)
      linkEntity = this.linkRepository.create({
        tag,
        name,
        link,
        target,
        contact: { id: contact },
      });

    return await this.linkRepository.save(linkEntity);
  }

  async updateLink(link: Link, updateLinkDto: UpdateLinkDto): Promise<Link> {
    this.logger.verbose(
      `Updating a link. ID: ${link.id}, Data: ${JSON.stringify(updateLinkDto)}`,
    );

    try {
      const response = (
        await this.linkRepository
          .createQueryBuilder()
          .update(Link)
          .set(updateLinkDto)
          .where('id = :id', {
            id: link.id,
          })
          .returning('*')
          .execute()
      ).raw[0];

      let result;
      if (response.paragraphId) {
        result = {
          ...response,
          paragraph: { id: response.paragraphId },
        };
        delete result.workExperienceId;
      }

      if (response.workExperienceId) {
        result = {
          ...response,
          workExperience: { id: response.workExperienceId },
        };
        delete result.projectId;
      }

      if (response.contactId) {
        result = {
          ...response,
          contact: { id: response.contactId },
        };
        delete result.projectId;
      }

      return result;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }
}
