import { CreateFooterDto } from '../../../../../src/models/dto/admin/create-footer.dto';

export class CreateFooterDtoFactory {
  static build(): CreateFooterDto {
    const createFooterDto = new CreateFooterDto();
    createFooterDto.user = '4f8d94aa-a7c8-485d-9c7f-e71cc5423ab3';

    return createFooterDto;
  }
}
