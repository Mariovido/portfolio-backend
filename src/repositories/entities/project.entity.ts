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
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  subtitle: string;

  @Column({ nullable: true })
  projectLink?: string;

  @Column({ nullable: true })
  imageLink?: string;

  @Column()
  date: Date;

  @Column({ default: false })
  isDisplayed: boolean;

  @OneToMany(() => BulletPoint, (bulletPoint) => bulletPoint.project, {
    eager: true,
    nullable: true,
  })
  bulletPoints?: BulletPoint[];

  @OneToMany(() => Link, (link) => link.project, {
    eager: true,
    nullable: true,
  })
  links?: Link[];

  @OneToMany(() => Tag, (tag) => tag.project, {
    eager: true,
    nullable: true,
  })
  tags?: Tag[];

  @ManyToOne(() => User, (user) => user.projects, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
