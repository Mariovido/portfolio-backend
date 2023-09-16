import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Contact {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  linkedinUrl?: string;

  @Column({ nullable: true })
  githubUrl?: string;

  @OneToOne(() => User, (user) => user.contact, { eager: false })
  @Exclude({ toPlainOnly: true })
  @JoinColumn()
  user: User;
}
