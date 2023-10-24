import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { User } from './user.entity';
import { Link } from './link.entity';
import { Footer } from './footer.entity';

@Entity()
export class Paragraph {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  paragraph: string;

  @Column()
  order: number;

  @OneToMany(() => Link, (link) => link.paragraph, {
    eager: true,
    nullable: true,
  })
  links?: Link[];

  @ManyToOne(() => User, (user) => user.about, {
    eager: false,
    nullable: true,
  })
  @Exclude({ toPlainOnly: true })
  user?: User;

  @ManyToOne(() => Footer, (footer) => footer.paragraph, {
    eager: false,
    nullable: true,
  })
  @Exclude({ toPlainOnly: true })
  footer?: Footer;
}
