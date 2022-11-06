import { Controller, Post, Body, HttpException } from '@nestjs/common';

import { db } from '../config';

@Controller('users/auth/login')
export class UsersController {
    @Post()
    findAll(@Body() body): string {
        console.log(body);
        return db.query("SELECT * FROM public.login($1, $2)", [body.email, body.password])
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
