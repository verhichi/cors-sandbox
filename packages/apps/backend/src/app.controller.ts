import { Controller, Get, Post, Delete, Put, Head, Options, Patch } from '@nestjs/common'
import { AppService } from './app.service'

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  @Post()
  postHello(): string {
    return this.appService.getHello()
  }

  @Delete()
  deleteHello(): string {
    return this.appService.getHello()
  }

  @Put()
  putHello(): string {
    return this.appService.getHello()
  }

  @Patch()
  patchHello(): string {
    return this.appService.getHello()
  }

  @Head()
  headHello(): string {
    return this.appService.getHello()
  }

  @Options()
  optionsHello(): string {
    return this.appService.getHello()
  }
}
