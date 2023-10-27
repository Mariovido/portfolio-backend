import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { WorkExperience } from './work-experience.entity';
import { Paragraph } from './paragraph.entity';
import { Contact } from './contact.entity';
import { Project } from './project.entity';

@Entity()
export class Link {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  tag?: string;

  @Column({ nullable: true })
  name?: string;

  @Column()
  link: string;

  @Column({ nullable: true })
  target?: string;

  @ManyToOne(() => WorkExperience, (workExperience) => workExperience.links, {
    eager: false,
    nullable: true,
  })
  @Exclude({ toPlainOnly: true })
  workExperience?: WorkExperience;

  @ManyToOne(() => Paragraph, (paragraph) => paragraph.links, {
    eager: false,
    nullable: true,
  })
  @Exclude({ toPlainOnly: true })
  paragraph?: Paragraph;

  @ManyToOne(() => Contact, (contact) => contact.links, {
    eager: false,
    nullable: true,
  })
  @Exclude({ toPlainOnly: true })
  contact?: Contact;

  @ManyToOne(() => Project, (project) => project.links, {
    eager: false,
    nullable: true,
  })
  @Exclude({ toPlainOnly: true })
  project?: Project;
}
