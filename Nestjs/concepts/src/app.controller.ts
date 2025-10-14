import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  //App service is injected through the constructor
  //constructor based dependecy injection
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    //using the injected service and get the getHello method
    return this.appService.getHello();
  }
}
