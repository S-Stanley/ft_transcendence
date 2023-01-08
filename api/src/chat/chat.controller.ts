import { Controller, Post, Body, HttpException, Param, Get, Put } from '@nestjs/common';
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
        const all_chats = await this.db.query(
            `
                WITH all_privates_chats AS (
                    SELECT
                        chat.id AS chat_id,
                        chat.name,
                        chat.type,
                        chat_member.user_id
                    FROM
                        public.chat
                    JOIN
                        public.chat_member
                    ON
                        chat.id = chat_member.chat_id
                    WHERE
                        type = 'private'
                    AND
                        user_id = $1
                ),
                user_of_private_chat AS (
                    SELECT
                        all_privates_chats.chat_id,
                        all_privates_chats.name,
                        all_privates_chats.type,
                        all_privates_chats.user_id,
                        users.nickname,
                        users.avatar
                    FROM
                        public.chat_member
                    JOIN
                        all_privates_chats
                    ON
                        all_privates_chats.chat_id = chat_member.chat_id
                    JOIN
                        public.users
                    ON
                        chat_member.user_id = users.id
                    WHERE
                        chat_member.user_id != $1
                ),
                all_publics_chats AS (
                    SELECT
                        id AS chat_id,
                        name,
                        type
                    FROM
                        public.chat
                    WHERE
                        type = 'public'
                )
                SELECT
                    chat_id AS id,
                    name,
                    type,
                    user_id,
                    nickname,
                    avatar AS picture
                FROM
                    user_of_private_chat
                UNION
                SELECT
                    chat_id AS id,
                    name,
                    type,
                    NULL AS user_id,
                    NULL AS nickname,
                    NULL AS picture
                FROM
                    all_publics_chats
                LIMIT
                    25;
            `,
            [params.user_id]
        );
        return (all_chats.rows);
    }

    @Put()
    async createNewPublicChat(@Body() body){
        if (!body?.chat_name || !body?.user_id)
            throw new HttpException('Missing body parameters', 500);
        try {
            const publicChatCreated = await this.db.query(
                'SELECT public.create_new_chat($1, $2);',
                [body.chat_name, body.user_id]
            );
            return (publicChatCreated.rows[0].create_new_chat);
        } catch (e) {
            console.error(e);
            return (null);
        }
    }
}
