import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthSignUpDto } from '../models/dto/auth/auth-signup.dto';
import {
  ConflictException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { genSalt, hash } from 'bcrypt';
import { UpdateUserDto } from '../models/dto/admin/update-user.dto';

export class UserRepository extends Repository<User> {
  private logger = new Logger('UserRepository', { timestamp: true });

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super(
      userRepository.target,
      userRepository.manager,
      userRepository.queryRunner,
    );
  }

  async createUser(authSignUpDto: AuthSignUpDto): Promise<User> {
    const { username, password, firstName, lastName, dateOfBirth } =
      authSignUpDto;
    this.logger.verbose(`Creating new user entity. username: ${username}`);

    const salt = await genSalt();
    const hashedPassword = await hash(password, salt);

    const user = this.userRepository.create({
      username,
      password: hashedPassword,
      firstName,
      lastName,
      dateOfBirth,
    });

    try {
      return await this.userRepository.save(user);
    } catch (error) {
      this.logger.error(error);
      if (error.code === '23505')
        throw new ConflictException('Username already exists');
      else throw new InternalServerErrorException();
    }
  }

  async updateUser(user: User, updateUserDto: UpdateUserDto): Promise<User> {
    this.logger.verbose(
      `Updating a user. ID: ${user.id}, Data: ${JSON.stringify(updateUserDto)}`,
    );
    try {
      const response = await this.userRepository
        .createQueryBuilder()
        .update(User)
        .set(updateUserDto)
        .where('id = :id', {
          id: user.id,
        })
        .returning('*')
        .execute();
      return response.raw[0];
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }
}
