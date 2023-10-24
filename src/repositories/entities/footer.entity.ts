import {
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Exclude } from 'class-transformer';
import { Paragraph } from './paragraph.entity';

@Entity()
export class Footer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Paragraph, (paragraph) => paragraph.footer, { eager: true })
  paragraph: Paragraph[];

  @OneToOne(() => User, (user) => user.contact, { eager: false })
  @Exclude({ toPlainOnly: true })
  @JoinColumn()
  user: User;
}
