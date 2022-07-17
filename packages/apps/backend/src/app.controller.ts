import {
  Controller,
  Post,
  Body,
  INestApplication,
  Get,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { AppService } from './app.service'
import { tServerOptions, tNoServer } from './types'
import { NO_SERVER } from './constants'
import axios from 'axios'

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  app: INestApplication | tNoServer = NO_SERVER

  @Post('createServer')
  async createServer(@Body() serverOptions: tServerOptions) {
    // if server already exists, close first
    if (this.app !== NO_SERVER) await this.app.close()

    this.app = await this.appService.createServer(serverOptions)
    return 'Server created!'
  }

  @Get('healthcheck')
  async healthCheck() {
    try {
      await axios.get('http://localhost:8000/api/monitor')
      return 'success'
    } catch {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Server is not up',
        },
        HttpStatus.FORBIDDEN,
      )
    }
  }
}
