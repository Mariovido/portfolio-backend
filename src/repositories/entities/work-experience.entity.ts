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
import { Link } from './link.entity';
import { Tag } from './tag.entity';

@Entity()
export class WorkExperience {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  role: string;

  @Column()
  company: string;

  @Column({ nullable: true })
  companyLink?: string;

  @Column({ type: 'timestamptz' })
  startDate: Date;

  @Column({ type: 'timestamptz', nullable: true })
  endDate?: Date;

  @OneToMany(() => BulletPoint, (bulletPoint) => bulletPoint.workExperience, {
    eager: true,
  })
  bulletPoints: BulletPoint[];

  @OneToMany(() => Link, (link) => link.workExperience, {
    eager: true,
    nullable: true,
  })
  links?: Link[];

  @OneToMany(() => Tag, (tag) => tag.workExperience, {
    eager: true,
    nullable: true,
  })
  tags?: Tag[];

  @ManyToOne(() => User, (user) => user.workExperiences, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
