import { Controller, Post, Body, HttpException, Param, Get, Headers } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Chat } from 'src/entities/chat.entity';
import { ChatService } from 'src/services/chat.service';

@Controller('chat')
@Injectable()

export class ChatController {
    constructor(private chatService: ChatService) {}

    @Post('/:name')
    async createChatAction(@Param('name') name: string, @Headers('authorization') token: string): Promise<Chat> {
        return this.chatService.createChat(name, token.split('Bearer ')[1]);
    }

    // @Post('/send')
    // async sendMessageToChat(@Body() body): Promise<boolean> {
    //     if (!body?.chat_id || !body?.sender_id || !body?.content) {
    //         throw new HttpException('Missing params', 500);
    //     }
    //     if (!isValidUUIDV4(body.chat_id) || !isValidUUIDV4(body.sender_id)) {
    //         throw new HttpException('Wrong format for params, expecting UUID', 500);
    //     }
    //     await this.db.query(
    //         'INSERT INTO chat_message (chat_id, sent_by, content) VALUES($1, $2, $3)',
    //         [body.chat_id, body.sender_id, body.content]
    //     );
    //     return (true);
    // }

    // @Get('/:chat_id')
    // async getMessagesByChatId(@Param() params) {
    //     const get_messages = await this.db.query(
    //         'SELECT * FROM public.chat_message WHERE chat_id=$1 ORDER BY created_at ASC LIMIT 10',
    //         [params.chat_id]
    //     );
    //     const messages_with_email = await Promise.all(
    //         get_messages.rows.map(async(msg: {sent_by: string}) => {
    //             const usr = await this.findUserById(msg?.sent_by);
    //             msg['email'] = usr?.email;
    //             return (msg);
    //         })
    //     );
    //     return (messages_with_email);
    // }
}
