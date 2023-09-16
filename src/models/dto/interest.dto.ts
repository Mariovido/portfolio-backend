import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsUUID, MaxLength } from 'class-validator';

export class InterestDto {
  @IsUUID()
  @ApiProperty()
  id: string;

  @IsAlphanumeric()
  @MaxLength(20)
  @ApiProperty()
  interestName: string;

  @IsUUID()
  @ApiProperty()
  user: string;
}
