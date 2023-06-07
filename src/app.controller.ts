import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  @Inject(AppService)
  private readonly appService: AppService;
  // 直接注入 字符串 token 为class得对象
  @Inject('app_service')
  private readonly appService2: AppService;

  // 直接注入指定得值
  @Inject('person')
  private readonly person: { name: string; age: number };

  // 注入动态产生得值
  @Inject('person2')
  private readonly person2: { message: string; type: string };

  // 注入 useFactory 接收参数产生得对象
  @Inject('person3')
  private readonly person3: { message: string; type: string };

  // useFactory 异步注入
  @Inject('person4')
  private readonly person4: { message: string; type: string };

  // 别名注入，对象实际上是person4 只是换个名字注入
  @Inject('person5')
  private readonly person5: { message: string; type: string };

  @Get()
  getHello(): string {
    console.log(this.appService2);
    console.log(this.person);
    console.log(this.person2);
    console.log(this.person3);
    console.log(this.person4);
    console.log(this.person5);
    return this.appService.getHello();
  }
}
