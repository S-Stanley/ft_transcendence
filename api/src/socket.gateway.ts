import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';

@WebSocketGateway()
export class SocketGateway {
    @WebSocketServer()
        server;

    @SubscribeMessage('message')
    handleMessage(@MessageBody() message: { data: { content: string, nickname: string, chat_id: string } }): void {
        this.server.emit(message.data.chat_id, {
            content: message.data?.content,
            nickname: message.data?.nickname,
            chat_id: message.data?.chat_id
        });
    }
}