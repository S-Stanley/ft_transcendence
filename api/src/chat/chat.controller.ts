import { Controller, Post, Body, HttpException, Param, Get, Put, Patch } from '@nestjs/common';
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
        const check_blocked = await this.db.query(
            `
                WITH id_dest AS (
                    SELECT
                        user_id
                    FROM
                        public.chat_member
                    WHERE
                        user_id != $1
                    AND
                        chat_id = $2
                )
                SELECT
                    id
                FROM
                    public.blocked_users
                WHERE (
                        user_id = $1
                    AND
                        blocked_user_id = (
                            SELECT
                                user_id
                            FROM
                                public.chat_member
                            WHERE
                                user_id != $1
                            AND
                                chat_id = $2
                        )
                ) OR (
                        user_id = (
                            SELECT
                                user_id
                            FROM
                                public.chat_member
                            WHERE
                                user_id != $1
                            AND
                                chat_id = $2
                        )
                    AND
                        blocked_user_id = $1
                )
            `,
            [body?.sender_id, body?.chat_id]
        );
        if (check_blocked?.rows.length > 0) {
            throw new HttpException('cannot send msg because user is blocked', 500);
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
                        DISTINCT(chat.id) AS chat_id,
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
                        type,
                        password,
                        (CASE
                            WHEN (
                                SELECT
                                    id
                                FROM
                                    public.chat_member
                                WHERE
                                    chat_member.chat_id = chat.id
                                AND
                                    chat_member.user_id = $1
                            ) IS NULL THEN false
                            ELSE true
                        END) AS member
                    FROM
                        public.chat
                    WHERE
                        type = 'public'
                )
                SELECT
                    chat_id AS id,
                    name,
                    type,
                    NULL AS password,
                    NULL AS member,
                    user_id,
                    nickname,
                    avatar AS picture
                FROM
                    user_of_private_chat
                UNION ALL
                SELECT
                    chat_id AS id,
                    name,
                    type,
                    CASE
                        WHEN password IS NULL THEN NULL
                        ELSE true
                    END CASE,
                    member,
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

    @Patch('/password')
    async updatePasswordChat(@Body() body){
        const checkUserOwnerOfChat = await this.db.query(
            `
                SELECT
                    user_id
                FROM
                    public.chat_admin
                WHERE
                    chat_id = $1
                AND
                    user_id = $2
            `,
            [body?.chat_id, body?.user_id]
        );
        if (!checkUserOwnerOfChat.rows[0]) {
            throw new HttpException('Wrong permissions', 500);
        }

        if (body?.password === '') {
            const updatePasswordChat = await this.db.query(
                `
                    UPDATE
                        public.chat
                    SET
                        password = NULL
                    WHERE
                        id = $1
                `,
                [body?.chat_id]
            );
            if (updatePasswordChat?.rowCount === 0) {
                throw new HttpException('Did not update', 500);
            }
        } else {
            const updatePasswordChat = await this.db.query(
                `
                    UPDATE
                        public.chat
                    SET
                        password = crypt($1, gen_salt('bf',11))
                    WHERE
                        id = $2
                `,
                [body?.password, body?.chat_id]
            );
            if (updatePasswordChat?.rowCount === 0) {
                throw new HttpException('Did not update', 500);
            }
        }
        return (true);
    }

    @Get('/admin/:chat_id/:user_id')
    async IsUserAdmin(@Param() params){
        try {
            const isUserAdm = await this.db.query(
                `
                    SELECT
                        *
                    FROM
                        public.chat_admin
                    WHERE
                        chat_id = $1
                    AND
                        user_id = $2
                `,
                [params?.chat_id, params?.user_id]
            );
            if (!isUserAdm.rows[0]) {
                return (false);
            }
            return (true);
        } catch (e) {
            console.error(e);
            return (false);
        }
    }

    @Post('/join')
    async joinChat(@Body() body){
        try {
            const join_chat = await this.db.query(
                'SELECT * FROM public.join_public_chat($1::UUID, $2::INT, $3::VARCHAR)',
                [body?.chat_id, body?.user_id, body?.password]
            );
            return (join_chat.rows[0].join_public_chat);
        } catch (e) {
            console.error(e);
            return (false);
        }
    }

    @Get('/members/:chat_id')
    async getAllMembers(@Param() params) {
        try {
            const all_members = await this.db.query(
                `
                    SELECT
                        users.id,
                        users.nickname,
                        users.email,
                        (CASE
                            WHEN user_id = ANY(
                                SELECT
                                    user_id
                                FROM
                                    public.chat_admin
                                WHERE
                                    chat_id = $1
                            ) THEN true
                            ELSE false
                        END) AS admin
                    FROM
                        public.chat_member
                    JOIN
                        public.users
                    ON
                        users.id = chat_member.user_id
                    WHERE
                        chat_member.chat_id = $1;
                `,
                [params?.chat_id]
            );
            return (all_members.rows);
        } catch (e) {
            console.error(e);
            return (false);
        }
    }

    @Post('/admin')
    async updateChatAdmin(@Body() body){
        try {
            const updated_list = await this.db.query(
                `
                    SELECT * FROM public.update_chat_admin(
                        $1,
                        $2,
                        $3,
                        $4
                    );
                `,
                [body?.list_to_delete, body?.list_to_add, body?.chat_id, body?.user_id]
            );
            if (!updated_list?.rows[0]?.update_chat_admin) {
                throw new HttpException('Wront permissions', 500);
            }
            return (true);
        } catch (e) {
            console.error(e);
            throw new HttpException('Wront permissions', 500);
        }
    }
}
