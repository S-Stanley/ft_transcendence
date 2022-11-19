import { Controller, Post, Body, HttpException, Param, Get} from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { UserConnected } from 'src/configs/userconnected.decorator';
import { Chat } from 'src/entities/chat.entity';
import { Message } from 'src/entities/message.entity';
import { User } from 'src/entities/user.entity';
import { ChatService } from 'src/services/chat.service';

@Controller('chat')
@Injectable()

export class ChatController {
    constructor(private chatService: ChatService) {}

    @Post('/:name')
    async createChatAction(@Param('name') name: string, @UserConnected() user: User): Promise<Chat> {
        return this.chatService.createChat(name, user);
    }

    @Get('/:name')
    async getChatAction(@Param('name') name: string): Promise<Chat> {
        return this.chatService.getChat(name);
    }

    @Post('/:name/message')
    async sendMessageAction(@Body() body, @Param('name') name: string, @UserConnected() user: User): Promise<Message> {
        if (!body?.message) {
            throw new HttpException('Message is missing', 400);
        }
        return this.chatService.sendMessage(body.message, name, user);
    }
}
