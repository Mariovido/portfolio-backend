import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Education } from './education.entity';
import { WorkExperience } from './work-experience.entity';
import { Skill } from './skill.entity';
import { Project } from './project.entity';
import { Contact } from './contact.entity';
import { Paragraph } from './paragraph.entity';
import { IsOptional } from 'class-validator';
import { Footer } from './footer.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ type: 'timestamptz' })
  dateOfBirth: Date;

  @Column({ nullable: true })
  @IsOptional()
  description?: string;

  @OneToMany(() => Paragraph, (paragraph) => paragraph.user, { eager: true })
  about: Paragraph[];

  @OneToMany(() => Education, (education) => education.user, { eager: true })
  educations: Education[];

  @OneToMany(() => WorkExperience, (workExperience) => workExperience.user, {
    eager: true,
  })
  workExperiences: WorkExperience[];

  @OneToMany(() => Skill, (skill) => skill.user, { eager: true })
  skills: Skill[];

  @OneToMany(() => Project, (project) => project.user, { eager: true })
  projects: Project[];

  @OneToOne(() => Contact, (contact) => contact.user, { eager: true })
  contact: Contact;

  @OneToOne(() => Footer, (footer) => footer.user, { eager: true })
  footer: Footer;
}
