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

    @SubscribeMessage('game-player-move')
    handlePlayerMove(@MessageBody() message: { data: { player_id: string, direction: string, position: string, game_id: string } }): void {
        this.server.emit('game-player-move', {
            player_id: message.data?.player_id,
            position: message.data?.position,
            direction: message.data?.direction,
            game_id: message.data?.game_id,
        });
    }
}