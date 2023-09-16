import { Module } from '@nestjs/common';
import { PortfolioController } from './portfolio.controller';
import { PortfolioService } from './portfolio.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../repositories/entities/user.entity';
import { Education } from '../../repositories/entities/education.entity';
import { WorkExperience } from '../../repositories/entities/work-experience.entity';
import { Skill } from '../../repositories/entities/skill.entity';
import { Project } from '../../repositories/entities/project.entity';
import { Contact } from '../../repositories/entities/contact.entity';
import { Interest } from '../../repositories/entities/interest.entity';
import { Technology } from '../../repositories/entities/technology.entity';
import { BulletPoint } from '../../repositories/entities/bullet-point.entity';
import { UserRepository } from '../../repositories/user.repository';
import { EducationRepository } from '../../repositories/education.repository';
import { WorkExperienceRepository } from '../../repositories/work-experience.repository';
import { SkillRepository } from '../../repositories/skill.repository';
import { ProjectRepository } from '../../repositories/project.repository';
import { ContactRepository } from '../../repositories/contact.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Education,
      WorkExperience,
      Skill,
      Project,
      Contact,
      Interest,
      Technology,
      BulletPoint,
    ]),
  ],
  controllers: [PortfolioController],
  providers: [
    PortfolioService,
    UserRepository,
    EducationRepository,
    WorkExperienceRepository,
    SkillRepository,
    ProjectRepository,
    ContactRepository,
  ],
})
export class PortfolioModule {}
