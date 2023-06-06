import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';

// 从上往下匹配
@Controller('api/person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  // form-data 一般用于文件传输
  @Post('files')
  @UseInterceptors(
    AnyFilesInterceptor({
      dest: 'uploads/',
    }),
  )
  bodyFiles(
    @Body() createPersonDto: CreatePersonDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    console.log(files, 'files --- ');
    return `result: ${JSON.stringify(createPersonDto)}`;
  }

  // json
  @Post('post')
  postBody(@Body() createPersonDto: CreatePersonDto) {
    return `result: ${JSON.stringify(createPersonDto)}`;
  }

  // x-www-form-urlencoded
  @Post()
  body(@Body() createPersonDto: CreatePersonDto) {
    return `result: ${JSON.stringify(createPersonDto)}`;
  }

  // url query
  @Get('find')
  query(@Query('name') name: string, @Query('age') age: number) {
    return `result: name=${name} age=${age}`;
  }

  // url params
  @Get(':id')
  urlParam(@Param('id') id: string) {
    return `data: id=${id}`;
  }
}
