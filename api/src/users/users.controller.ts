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
        return this.db.query(`SELECT * FROM users WHERE email='${user.email}'`)
            .then((result: { rows: any }) => {
                if (result.rows.length === 0) {
                    throw new HttpException('No user is associated with this email', 500);
                } else {
                    return ({user_id: result.rows[0].id,});
                }
            })
            .catch((e: any) => {
                console.error(e);
                throw new HttpException('Problem occured while fetching user_id', 500);
            });
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
                        token: result.rows[0].token,
                    });
                }
            })
            .catch((e: any) => {
                console.error(e);
                throw new HttpException('Email or password incorrect', 500);
            });
    }
}