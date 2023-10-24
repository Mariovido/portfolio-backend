import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Skill {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  skillName: string;

  @Column()
  rating: number;

  @ManyToOne(() => User, (user) => user.skills, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
