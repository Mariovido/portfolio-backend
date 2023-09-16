import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Interest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  interestName: string;

  @ManyToOne(() => User, (user) => user.interests, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
