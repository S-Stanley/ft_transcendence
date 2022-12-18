import { Controller, Param, Get, Post, Body } from '@nestjs/common';
import { Injectable, Inject } from '@nestjs/common';
// import { Controller, Post, Body, HttpException, Param, Get } from '@nestjs/common';
// import { isValidUUIDV4 } from 'is-valid-uuid-v4';
// import { Users } from 'src/entities/user.entity';

@Controller('discussion')
@Injectable()
export class DiscussionController {
    constructor(@Inject("PG_CONNECTION") private db: any){}

    // async findUserByEmail(email: string){
    //     try {
    //         const req = await this.db.query('SELECT * from public.users WHERE email=$1', [email]);
    //         if (req.rows.lenght === 0){
    //             return (null);
    //         }
    //         return (req.rows[0]?.id ?? null);
    //     } catch (e){
    //         console.error(e);
    //         return (null);
    //     }
    // }
    // async findUserById(id: string): Promise<Users | null>{
    //     try {
    //         const req = await this.db.query('SELECT * from public.users WHERE id=$1', [id]);
    //         if (req.rows.lenght === 0){
    //             return (null);
    //         }
    //         return (req.rows[0] ?? null);
    //     } catch (e){
    //         console.error(e);
    //         return (null);
    //     }
    // }

    // @Post()
    // async CreateOrGetChatId(@Body() body): Promise<{ chat_id: string }> {
    //     if (!body?.email || !body?.from) {
    //         throw new HttpException('Missing body params', 500);
    //     }
    //     const email = await this.findUserByEmail(body.email);
    //     const from = await this.findUserByEmail(body.from);
    //     if (!from || !email) {
    //         throw new HttpException('One of the user do not exist', 500);
    //     }
    //     const find_chat = await this.db.query(
    //         'SELECT * FROM public.chat WHERE $1 IN  (SELECT user_id FROM chat JOIN chat_member ON chat.id = chat_id) AND $2 IN (SELECT user_id FROM chat JOIN chat_member ON chat.id = chat_id);',
    //         [email, from]
    //     );
    //     if (find_chat.rows.length !== 0) {
    //         return ({
    //             chat_id: find_chat.rows[0].id
    //         });
    //     }
    //     const create_chart = await this.db.query('INSERT INTO chat DEFAULT VALUES RETURNING id');
    //     await this.db.query(
    //         'INSERT INTO chat_member (chat_id, user_id) VALUES($1, $2)',
    //         [create_chart.rows[0].id, email]
    //     );
    //     await this.db.query(
    //         'INSERT INTO chat_member (chat_id, user_id) VALUES($1, $2)',
    //         [create_chart.rows[0].id, from]
    //     );
    //     return ({
    //         chat_id: create_chart.rows[0].id
    //     });
    // }

    // @Post('/send')
    // async sendMessageToChat(@Body() body): Promise<boolean> {
    //     if (!body?.chat_id || !body?.sender_id || !body?.content) {
    //         throw new HttpException('Missing params', 500);
    //     }
    //     if (!isValidUUIDV4(body.chat_id)) {
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
    //             msg['nickname'] = usr?.nickname;
    //             return (msg);
    //         })
    //     );
    //     return (messages_with_email);
    // }

    @Get('/all/:user_id')
    async getAllChatByUserId(@Param() params) {
        const all_chats = await this.db.query('select users.nickname, users.avatar, users.id from users join conversation on conversation.two=$1 where users.id=conversation.one union select users.nickname, users.avatar, users.id from users join conversation on conversation.one=$1 where users.id=conversation.two;', [params.user_id]);
        return (all_chats.rows);
    }

    @Get('/message/:user_id')
    async getAllMessageByUserId(@Param() params: {user_id: string, me:string}) {
        console.log('me is eheheh', params.me);
        const all_message = await this.db.query('select users.nickname, users.avatar, message.sender, message.receiver, message.content from users join message on message.sender=$1 or message.receiver=$1 where users.id=$1;', [params.user_id]);
        return (all_message.rows);
    }

    @Post('/message/:user_id')
    async postMessageToTarget(@Param() params, @Body() body: { target_id: string, content: string}) {
        const insert_message = await this.db.query('insert into public.message (sender, receiver, content) values($1, $2, $3)', [params.user_id, body.target_id, body.content]);
        console.log('the insert message is ', insert_message);
        return (insert_message.rowCount);
    }

    @Post('/create_conversation')
    async createConversation(@Body() body: { user_id: number, username: string}) {
        const res = await this.db.query('select users.id from users where users.nickname=$1', [body.username]);
        const username_id = res.rows[0].id;
        if (username_id === body.user_id)
            return (2);
        const conversation_one = await this.db.query('select * from conversation where conversation.one=$1 and conversation.two=$2', [username_id, body.user_id]);
        const conversation_two = await this.db.query('select * from conversation where conversation.one=$2 and conversation.two=$1', [username_id, body.user_id]);
        if (conversation_one || conversation_two)
            return (3);
        // console.log('the username id is', username_id.rows[0].id);
        // const insert_message = await this.db.query('insert into public.conversation (one, two) values($1, $2)', [body.user_id, body.username]);
        // return (insert_message.rows);
        return (null);
    }
}
