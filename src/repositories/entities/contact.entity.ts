import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Exclude } from 'class-transformer';
import { Link } from './link.entity';

@Entity()
export class Contact {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @OneToMany(() => Link, (link) => link.contact, {
    eager: true,
    nullable: true,
  })
  links?: Link[];

  @OneToOne(() => User, (user) => user.contact, { eager: false })
  @Exclude({ toPlainOnly: true })
  @JoinColumn()
  user: User;
}
