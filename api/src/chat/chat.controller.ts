import { Controller, Post, Body, HttpException, Param, Get } from '@nestjs/common';
import { Injectable, Inject } from '@nestjs/common';
import { isValidUUIDV4 } from 'is-valid-uuid-v4';
import { Users } from 'src/entities/user.entity';

@Controller('chat')
@Injectable()

export class ChatController {
    constructor(@Inject("PG_CONNECTION") private db: any){}

    async findUserByEmail(email: string){
        try {
            const req = await this.db.query('SELECT * from public.users WHERE email=$1', [email]);
            if (req.rows.lenght === 0){
                return (null);
            }
            return (req.rows[0]?.id ?? null);
        } catch (e){
            console.error(e);
            return (null);
        }
    }
    async findUserById(id: string): Promise<Users | null>{
        try {
            const req = await this.db.query('SELECT * from public.users WHERE id=$1', [id]);
            if (req.rows.lenght === 0){
                return (null);
            }
            return (req.rows[0] ?? null);
        } catch (e){
            console.error(e);
            return (null);
        }
    }

    @Post()
    async CreateOrGetChatId(@Body() body): Promise<{ chat_id: string }> {
        if (!body?.email || !body?.from) {
            throw new HttpException('Missing body params', 500);
        }
        const email = await this.findUserByEmail(body.email);
        const from = await this.findUserByEmail(body.from);
        if (!from || !email) {
            throw new HttpException('One of the user do not exist', 500);
        }
        const chat_id = await this.db.query(
            'SELECT * FROM public.create_or_get_chat_id($1, $2);',
            [email, from]
        );
        return ({
            chat_id: chat_id.rows[0].create_or_get_chat_id
        });
    }

    @Post('/send')
    async sendMessageToChat(@Body() body): Promise<boolean> {
        if (!body?.chat_id || !body?.sender_id || !body?.content) {
            throw new HttpException('Missing params', 500);
        }
        if (!isValidUUIDV4(body.chat_id)) {
            throw new HttpException('Wrong format for params, expecting UUID', 500);
        }
        await this.db.query(
            'INSERT INTO chat_message (chat_id, sent_by, content) VALUES($1, $2, $3)',
            [body.chat_id, body.sender_id, body.content]
        );
        return (true);
    }

    @Get('/:chat_id')
    async getMessagesByChatId(@Param() params) {
        const get_messages = await this.db.query(
            'SELECT * FROM public.chat_message WHERE chat_id=$1 ORDER BY created_at ASC LIMIT 10',
            [params.chat_id]
        );
        const messages_with_email = await Promise.all(
            get_messages.rows.map(async(msg: {sent_by: string}) => {
                const usr = await this.findUserById(msg?.sent_by);
                msg['email'] = usr?.email;
                msg['nickname'] = usr?.nickname;
                return (msg);
            })
        );
        return (messages_with_email);
    }

    @Get('/all/:user_id')
    async getAllChatByUserId(@Param() params) {
        const all_chats = await this.db.query('SELECT * FROM public.chat WHERE chat.id IN (SELECT DISTINCT(chat_id) FROM public.chat_member WHERE user_id=$1) LIMIT 25', [params.user_id]);
        return (all_chats.rows);
    }
}
