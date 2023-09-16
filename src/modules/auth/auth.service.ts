import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../../repositories/user.repository';
import { AuthTokenResponseDto } from '../../models/dto/auth/auth-token-response.dto';
import { AuthSignUpDto } from '../../models/dto/auth/auth-signup.dto';
import { AuthLogInDto } from '../../models/dto/auth/auth-login.dto';
import { compare } from 'bcrypt';
import { JwtPayload } from '../../models/interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService', { timestamp: true });

  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authSignUpDto: AuthSignUpDto): Promise<void> {
    this.logger.verbose(
      `Creating a new user. username: ${authSignUpDto.username}`,
    );
    await this.userRepository.createUser(authSignUpDto);
  }

  async logIn(authLogInDto: AuthLogInDto): Promise<AuthTokenResponseDto> {
    const { username, password } = authLogInDto;
    this.logger.verbose(`Logging a user. username: ${username}`);

    const user = await this.userRepository.findOneBy({ username });

    if (!user)
      throw new UnauthorizedException('Please check your login credentials');

    const isPasswordValid = await compare(password, user.password);
    if (isPasswordValid) {
      const payload: JwtPayload = { username };
      const accessToken: string = this.jwtService.sign(payload);
      const authTokenResponseDto: AuthTokenResponseDto = {
        idUser: user.id,
        accessToken,
      };
      return authTokenResponseDto;
    } else
      throw new UnauthorizedException('Please check your login credentials');
  }
}
