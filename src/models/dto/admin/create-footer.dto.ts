import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CreateFooterDto {
  @IsUUID()
  @ApiProperty()
  user: string;
}
