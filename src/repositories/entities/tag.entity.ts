import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { WorkExperience } from './work-experience.entity';
import { Project } from './project.entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  tag: string;

  @ManyToOne(() => WorkExperience, (workExperience) => workExperience.tags, {
    eager: false,
    nullable: true,
  })
  @Exclude({ toPlainOnly: true })
  workExperience?: WorkExperience;

  @ManyToOne(() => Project, (project) => project.tags, {
    eager: false,
    nullable: true,
  })
  @Exclude({ toPlainOnly: true })
  project?: Project;
}
