import { Injectable } from '@nestjs/common'

@Injectable()
export class ServerService {
  getHello() {
    return 'hello world!'
  }
}
