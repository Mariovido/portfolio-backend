import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class UpdateContactDto {
  @IsEmail()
  @ApiProperty()
  email: string;
}
