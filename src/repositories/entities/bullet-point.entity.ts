import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Project } from './project.entity';
import { WorkExperience } from './work-experience.entity';

@Entity()
export class BulletPoint {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  bulletPoint: string;

  @ManyToOne(
    () => WorkExperience,
    (workExperience) => workExperience.bulletPoints,
    {
      eager: false,
      nullable: true,
    },
  )
  @Exclude({ toPlainOnly: true })
  workExperience?: WorkExperience;

  @ManyToOne(() => Project, (project) => project.bulletPoints, {
    eager: false,
    nullable: true,
  })
  @Exclude({ toPlainOnly: true })
  project?: Project;
}
