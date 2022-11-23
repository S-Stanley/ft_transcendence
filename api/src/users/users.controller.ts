import { Controller, Post, Body, Get } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { UserConnected } from 'src/configs/userconnected.decorator';
import { UserDTO } from 'src/dtos/profile.dto';
import { TokenReturn } from 'src/dtos/tokenreturn.dto';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/services/user.service';

@Controller('users')
@Injectable()
export class UsersController {
    constructor(private userService: UserService) {}

    @Post('/auth')
    authAction(@Body() body: { code: string }): Promise<TokenReturn> {
        return this.userService.authUser(body.code);
    }

    @Get('/me')
    getProfileAction(@UserConnected() user: User): UserDTO {
        return this.userService.getProfile(user);
    }
}