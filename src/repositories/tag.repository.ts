import { Repository } from 'typeorm';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTagDto } from '../models/dto/admin/create-tag.dto';
import { UpdateTagDto } from '../models/dto/admin/update-tag.dto';
import { Tag } from './entities/tag.entity';
import { WorkExperience } from './entities/work-experience.entity';
import { Project } from './entities/project.entity';

export class TagRepository extends Repository<Tag> {
  private logger = new Logger('TagRepository', { timestamp: true });

  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {
    super(
      tagRepository.target,
      tagRepository.manager,
      tagRepository.queryRunner,
    );
  }

  async findTagByWorkExperiences(
    workExperiences: WorkExperience[],
  ): Promise<Tag[]> {
    this.logger.verbose(`Finding tags by work experiences.`);
    const tagList: Tag[] = [];
    for (const workExperience of workExperiences) {
      const tag = await this.tagRepository.find({
        where: {
          workExperience: { id: workExperience.id },
        },
      });

      tag.forEach((tagAux) => {
        const workExperienceAux = new WorkExperience();
        workExperienceAux.id = workExperience.id;
        tagAux.workExperience = workExperienceAux;
        tagList.push(tagAux);
      });
    }

    return tagList;
  }

  async findTagByProjects(projects: Project[]): Promise<Tag[]> {
    this.logger.verbose(`Finding tags by work experiences.`);
    const tagList: Tag[] = [];
    for (const project of projects) {
      const tag = await this.tagRepository.find({
        where: {
          project: { id: project.id },
        },
      });

      tag.forEach((tagAux) => {
        const projectAux = new Project();
        projectAux.id = project.id;
        tagAux.project = projectAux;
        tagList.push(tagAux);
      });
    }

    return tagList;
  }

  async createTag(id: string, createTagDto: CreateTagDto): Promise<Tag> {
    const { tag, workExperience, project } = createTagDto;
    this.logger.verbose(`Creating new tag entity for user. ID: ${id}`);

    let tagCreated;
    if (workExperience)
      tagCreated = this.tagRepository.create({
        tag,
        workExperience: { id: workExperience },
      });

    if (project)
      tagCreated = this.tagRepository.create({
        tag,
        project: { id: project },
      });

    return await this.tagRepository.save(tagCreated);
  }

  async updateTag(tag: Tag, updateTagDto: UpdateTagDto): Promise<Tag> {
    this.logger.verbose(
      `Updating a tag. ID: ${tag.id}, Data: ${JSON.stringify(updateTagDto)}`,
    );
    try {
      const response = (
        await this.tagRepository
          .createQueryBuilder()
          .update(Tag)
          .set(updateTagDto)
          .where('id = :id', {
            id: tag.id,
          })
          .returning('*')
          .execute()
      ).raw[0];

      let result;
      if (response.workExperienceId) {
        result = {
          ...response,
          workExperience: { id: response.workExperienceId },
        };
        delete result.projectId;
      }

      if (response.projectId) {
        result = {
          ...response,
          project: { id: response.projectId },
        };
        delete result.workExperienceId;
      }

      return result;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }
}
