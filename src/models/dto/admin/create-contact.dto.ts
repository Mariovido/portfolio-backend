import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsUrl } from 'class-validator';

export class CreateContactDto {
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
}
