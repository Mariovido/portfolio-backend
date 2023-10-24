import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { WorkExperience } from './work-experience.entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  tag: string;

  @ManyToOne(() => WorkExperience, (workExperience) => workExperience.tags, {
    eager: false,
  })
  @Exclude({ toPlainOnly: true })
  workExperience: WorkExperience;
}
