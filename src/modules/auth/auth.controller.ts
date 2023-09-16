import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthTokenResponseDto } from '../../models/dto/auth/auth-token-response.dto';
import { AuthSignUpDto } from '../../models/dto/auth/auth-signup.dto';
import { AuthLogInDto } from '../../models/dto/auth/auth-login.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  private logger = new Logger('AuthController', { timestamp: true });

  constructor(private authService: AuthService) {}

  @Post('/signup')
  @ApiOperation({
    summary: 'Sign up a new user',
  })
  @ApiResponse({ status: 201 })
  signUp(@Body() authSignUpDto: AuthSignUpDto): Promise<void> {
    this.logger.verbose(
      `Creating a new user. username: ${authSignUpDto.username}`,
    );

    return this.authService.signUp(authSignUpDto);
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Log in a user',
  })
  @ApiResponse({ status: 200, type: AuthTokenResponseDto })
  logIn(@Body() authLogInDto: AuthLogInDto): Promise<AuthTokenResponseDto> {
    this.logger.verbose(`Logging a user. username: ${authLogInDto.username}`);
    return this.authService.logIn(authLogInDto);
  }
}
