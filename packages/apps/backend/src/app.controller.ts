import { Controller, Post, Body } from '@nestjs/common'
import { AppService } from './app.service'
import { tServerOptions } from './types'

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  createServer(@Body() serverOptions: tServerOptions) {
    this.appService.createServer(serverOptions)
    return 'Server created!'
  }
}
