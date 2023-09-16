import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class AuthTokenResponseDto {
  @IsUUID()
  @ApiProperty()
  idUser: string;

  @IsString()
  @ApiProperty()
  accessToken: string;
}
