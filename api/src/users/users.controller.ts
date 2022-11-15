import { Controller, Post, Body } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/services/user.service';

@Controller('users')
@Injectable()
export class UsersController {
    constructor(private userService: UserService) {}

    @Post('/auth')
    auth(@Body() body: { code: string }): Promise<void | { token: string; } | { token: string | void; }> {
        return this.userService.authUser(body.code).then((res) => {
            return { 
                token: res
            }
        })
    }
}