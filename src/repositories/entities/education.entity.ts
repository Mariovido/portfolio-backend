import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Education {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  courseName: string;

  @Column()
  institute: string;

  @Column()
  instituteLink: string;

  @Column({ type: 'timestamptz' })
  startDate: Date;

  @Column({ type: 'timestamptz', nullable: true })
  endDate?: Date;

  @Column({ type: 'decimal', precision: 4, scale: 2, nullable: true })
  grade?: number;

  @ManyToOne(() => User, (user) => user.educations, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
