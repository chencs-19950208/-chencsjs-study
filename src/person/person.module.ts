import { Global, Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';

// 当这里模块被很多模块引入的时候，我们不仅需要在多个模块中imports，那么为了省事
// 就把personModule 声明为全局的模块 @Global() form @nestjs/common
@Global()
@Module({
  imports: [],
  controllers: [PersonController],
  providers: [PersonService],
  // 当需要被别的模块中注入这里需要exports 出来
  exports: [PersonService],
})
export class PersonModule {}
