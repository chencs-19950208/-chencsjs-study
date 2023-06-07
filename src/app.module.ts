import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from './person/person.module';

@Module({
  imports: [PersonModule],
  controllers: [AppController],
  providers: [
    {
      provide: AppService,
      useClass: AppService,
    },
    {
      provide: 'app_service',
      useClass: AppService,
    },
    {
      provide: 'person',
      useValue: {
        name: 'chencs',
        age: 28,
      },
    },
    {
      provide: 'person2',
      useFactory() {
        return {
          message: '通知成功',
          type: 'info',
        };
      },
    },
    {
      provide: 'person3',
      useFactory(person: { name: string }, appService: AppService) {
        return {
          message: appService.getHello(),
          type: person.name,
        };
      },
      inject: ['person', AppService], // useFactory 接收参数注入这里需要inject 注入下
    },
    {
      provide: 'person4',
      async useFactory() {
        await new Promise((resolve) => {
          setTimeout(resolve, 3000);
        });
        return {
          message: '异步注入',
          type: 'async',
        };
      },
    },
    {
      provide: 'person5',
      useExisting: 'person4',
    },
  ],
})
export class AppModule {}
