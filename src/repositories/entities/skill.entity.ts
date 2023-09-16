import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Exclude } from 'class-transformer';
import { LevelSkillEnum } from '../../models/enums/LevelSkill.enum';

@Entity()
export class Skill {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  skillName: string;

  @Column()
  level: LevelSkillEnum;

  @Column()
  rating: number;

  @ManyToOne(() => User, (user) => user.skills, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
