import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, MaxLength } from 'class-validator';

export class CreateInterestDto {
  @IsAlphanumeric()
  @MaxLength(20)
  @ApiProperty()
  interestName: string;
}
