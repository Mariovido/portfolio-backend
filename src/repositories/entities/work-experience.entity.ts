import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Exclude } from 'class-transformer';
import { BulletPoint } from './bullet-point.entity';

@Entity()
export class WorkExperience {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  role: string;

  @Column()
  company: string;

  @Column({ type: 'timestamptz' })
  startDate: Date;

  @Column({ type: 'timestamptz', nullable: true })
  endDate?: Date;

  @OneToMany(() => BulletPoint, (bulletPoint) => bulletPoint.workExperience, {
    eager: true,
  })
  bulletPoints: BulletPoint[];

  @ManyToOne(() => User, (user) => user.workExperiences, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
