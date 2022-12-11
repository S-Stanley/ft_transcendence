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

    @SubscribeMessage('matchmaking')
    handleMatch(@MessageBody() message: { data: { target: string, callback: number, nickname:string } }): void {
        this.server.emit(message.data.target, {
            id_incoming: message.data?.callback,
            nickname: message.data?.nickname,
            confirmation: false,
        });
    }

    @SubscribeMessage('confirmation')
    handleConfirmation(@MessageBody() message: { data: { target: string, callback: number, nickname:string } }): void {
        this.server.emit(message.data.target, {
            id_incoming: message.data?.callback,
            nickname:message.data?.nickname,
            confirmation: true,
        });
    }

    @SubscribeMessage('game')
    updatePosition(@MessageBody() message: { data: { target: string, position:number } }): void {
        this.server.emit(message.data.target, {
            position:message.data?.position,
        });
    }
}
