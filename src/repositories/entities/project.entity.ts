import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Exclude } from 'class-transformer';
import { Technology } from './technology.entity';
import { BulletPoint } from './bullet-point.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  projectName: string;

  @OneToMany(() => Technology, (technology) => technology.project, {
    eager: true,
  })
  technologies: Technology[];

  @OneToMany(() => BulletPoint, (bulletPoint) => bulletPoint.project, {
    eager: true,
  })
  bulletPoints: BulletPoint[];

  @ManyToOne(() => User, (user) => user.projects, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
