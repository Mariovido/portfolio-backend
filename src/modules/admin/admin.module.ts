import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../repositories/entities/user.entity';
import { Education } from '../../repositories/entities/education.entity';
import { WorkExperience } from '../../repositories/entities/work-experience.entity';
import { Project } from '../../repositories/entities/project.entity';
import { Skill } from '../../repositories/entities/skill.entity';
import { Contact } from '../../repositories/entities/contact.entity';
import { BulletPoint } from '../../repositories/entities/bullet-point.entity';
import { UserRepository } from '../../repositories/user.repository';
import { EducationRepository } from '../../repositories/education.repository';
import { WorkExperienceRepository } from '../../repositories/work-experience.repository';
import { ProjectRepository } from '../../repositories/project.repository';
import { SkillRepository } from '../../repositories/skill.repository';
import { ContactRepository } from '../../repositories/contact.repository';
import { AuthModule } from '../auth/auth.module';
import { BulletPointRepository } from '../../repositories/bullet-point.repository';
import { TagRepository } from '../../repositories/tag.repository';
import { LinkRepository } from '../../repositories/link.repository';
import { Tag } from '../../repositories/entities/tag.entity';
import { Footer } from '../../repositories/entities/footer.entity';
import { FooterRepository } from '../../repositories/footer.repository';
import { Link } from '../../repositories/entities/link.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Education,
      WorkExperience,
      Project,
      Skill,
      Contact,
      BulletPoint,
      Tag,
      Link,
      Footer,
    ]),
    AuthModule,
  ],
  controllers: [AdminController],
  providers: [
    AdminService,
    UserRepository,
    EducationRepository,
    WorkExperienceRepository,
    ProjectRepository,
    SkillRepository,
    ContactRepository,
    BulletPointRepository,
    TagRepository,
    LinkRepository,
    FooterRepository,
  ],
})
export class AdminModule {}
