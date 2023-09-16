import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsUUID, IsUrl } from 'class-validator';

export class ContactDto {
  @IsUUID()
  @ApiProperty()
  id: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsUrl()
  @IsOptional()
  @ApiProperty()
  linkedinUrl?: string;

  @IsUrl()
  @IsOptional()
  @ApiProperty()
  githubUrl?: string;

  @IsUUID()
  @ApiProperty()
  user: string;
}
