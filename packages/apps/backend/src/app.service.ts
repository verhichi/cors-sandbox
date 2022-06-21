import { Injectable } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { tServerOptions } from './types'
import { ServerModule } from './CreatedServer/server.module'

@Injectable()
export class AppService {
  async createServer(serverOptions: tServerOptions) {
    const app = await NestFactory.create(ServerModule, {
      cors: serverOptions,
    })
    return await app.listen(8000)
  }
}
