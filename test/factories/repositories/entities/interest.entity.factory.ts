import { Interest } from '../../../../src/repositories/entities/interest.entity';
import { User } from '../../../../src/repositories/entities/user.entity';

export class InterestFactory {
  static build(): Interest {
    const interest = new Interest();
    interest.id = '38dca8f1-85a1-4b30-a0ed-36ded591c310';
    interest.interestName = 'Sports';
    interest.user = new User();

    return interest;
  }

  static buildList(size: number): Interest[] {
    const interestList: Interest[] = [];

    for (let i = 0; i < size; i++) {
      interestList.push(this.build());
    }

    return interestList;
  }
}
