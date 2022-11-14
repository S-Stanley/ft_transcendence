import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';

@WebSocketGateway()
export class SocketGateway {
    @WebSocketServer()
    server;

    @SubscribeMessage('message')
    handleMessage(@MessageBody() message: { data: { content: string, email: string, chat_id: string } }): void {
        this.server.emit('message', {
            content: message.data?.content,
            email: message.data?.email,
            chat_id: message.data?.chat_id
        });
    }
}