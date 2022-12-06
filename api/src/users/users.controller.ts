import { Controller, Post, Body, Get, HttpException, Inject, Param } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { UserConnected } from 'src/configs/userconnected.decorator';
import { UserDTO } from 'src/dtos/profile.dto';
import { UserAuth } from 'src/dtos/userauth';
import { Users } from 'src/entities/user.entity';
import { UserService } from 'src/services/user.service';

@Controller('users')
@Injectable()
export class UsersController {
    constructor(@Inject("PG_CONNECTION") private db: any, private userService: UserService) {}

    @Post('/auth')
    authAction(@Body() body: { code: string }): Promise<UserAuth> {
        return this.userService.authUser(body.code);
    }

    @Get('/me')
    getOwnProfileAction(@UserConnected() user: Users): UserDTO {
        return this.userService.getOwnProfile(user);
    }

    @Get('/id')
    getUserId(@UserConnected() user: Users): UserDTO {
        return this.db.query(`SELECT * FROM users WHERE id_42='${user.id_42}'`)
            .then((result: { rows: any }) => {
                if (result.rows.length === 0) {
                    throw new HttpException('No user is associated with this 42 id', 500);
                } else {
                    return ({user_id: result.rows[0].id,});
                }
            })
            .catch((e: any) => {
                console.error(e);
                throw new HttpException('Problem occured while fetching user_id', 500);
            });
    }

    @Post('/checkNickname')
    checkNickname(@Body() body: { nickname: string }): Promise<boolean> {
        return this.db.query(`SELECT * FROM users WHERE nickname='${body.nickname}'`)
            .then((result: { rows: any }) => {
                if (result.rows.length === 0) {
                    return (true);
                }
                return (false);
            })
            .catch((e: any) => {
                console.error(e);
                throw new HttpException('Problem occured while checking nickname in db', 500);
            });
    }

    @Post('/checkEmail')
    checkEmail(@Body() body: { email: string }): Promise<boolean> {
        return this.db.query(`SELECT * FROM users WHERE email='${body.email}'`)
            .then((result: { rows: any }) => {
                if (result.rows.length === 0) {
                    return (true);
                }
                return (false);
            })
            .catch((e: any) => {
                console.error(e);
                throw new HttpException('Problem occured while checking email in db', 500);
            });
    }

    @Post('/update')
    async changeUserData(@Body() body: { email: string, nickname: string, id_42: number}): Promise<UserDTO> {
        console.log(`the email is ${body.email}, the nickname is ${body.nickname}, the id is ${body.id_42}`);
        await this.db.query(`UPDATE users SET email='${body.email}' WHERE id_42='${body.id_42}'`);
        await this.db.query(`UPDATE users SET nickname='${body.nickname}' WHERE id_42='${body.id_42}'`);
        return this.db.query(`SELECT * FROM users WHERE id_42=${body.id_42}`);
    }

    @Get('/:nickname')
    getUserProfileAction(@Param('nickname') nickname: string) : Promise<UserDTO> {
        return this.userService.getUserProfile(nickname);
    }

    @Get('/email/:email')
    async getUserByEmail(@Param('email') email: string) : Promise<UserDTO> {
        const req = await this.db.query('SELECT * from public.users WHERE email=$1', [email]);
        if (!req || req.rows.length === 0){
            return (null);
        }
        return ({
            id_42: req.rows[0].id_42,
            email: req.rows[0].email,
            nickname: req.rows[0].nickname,
            avatar: req.rows[0].avatar,
        });
    }

    @Post('/auth/login')
    Login(@Body() body): string {
        return this.db.query("SELECT * FROM public.login($1, $2)", [body.email, body.password])
            .then((result: { rows: any }) => {
                if (result.rows.length === 0) {
                    throw new HttpException('User does not exist', 500);
                } else {
                    return ({
                        user_id: result.rows[0].id,
                        email: result.rows[0].email,
                        token: result.rows[0].access_token,
                        nickname: result.rows[0].nickname,
                    });
                }
            })
            .catch((e: any) => {
                console.error(e);
                throw new HttpException('Email or password incorrect', 500);
            });
    }
}