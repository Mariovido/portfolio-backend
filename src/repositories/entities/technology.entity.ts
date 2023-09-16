import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Project } from './project.entity';

@Entity()
export class Technology {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  technologyName: string;

  @ManyToOne(() => Project, (project) => project.technologies, { eager: false })
  @Exclude({ toPlainOnly: true })
  project: Project;
}
