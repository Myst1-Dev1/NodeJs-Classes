import { Injectable } from '@nestjs/common';

//decorator
//business logic of your application
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello Nest JS!';
  }
}
