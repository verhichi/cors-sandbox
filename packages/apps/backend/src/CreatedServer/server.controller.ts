import { Controller, Get, Post, Put, Delete, Patch } from '@nestjs/common'
import { ServerService } from './server.service'

@Controller('api')
export class ServerController {
  constructor(private readonly serverService: ServerService) {}

  @Get()
  getHello() {
    return this.serverService.getHello()
  }

  @Post()
  postHello() {
    return this.serverService.getHello()
  }

  @Put()
  putHello() {
    return this.serverService.getHello()
  }

  @Patch()
  patchHello() {
    return this.serverService.getHello()
  }

  @Delete()
  deleteHello() {
    return this.serverService.getHello()
  }
}
