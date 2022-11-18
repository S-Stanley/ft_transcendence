import { Controller, Post, Body, Get, Headers } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { UserDTO } from 'src/dtos/profile.dto';
import { UserService } from 'src/services/user.service';

@Controller('users')
@Injectable()
export class UsersController {
    constructor(private userService: UserService) {}

    @Post('/auth')
    authAction(@Body() body: { code: string }): Promise<void | { token: string; } | { token: string | void; }> {
        return this.userService.authUser(body.code).then((res) => {
            return { 
                token: res
            }
        })
    }

    @Get('/me')
    getProfileAction(@Headers('authorization') token: string) : Promise<UserDTO> {
        return this.userService.getProfile(token.split('Bearer ')[1]);
    }
}