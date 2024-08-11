import { WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway(8080, { namespace: '/user' })
class UserGateway {
  constructor() {}
}
