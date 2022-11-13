import { Controller, Post, Body, HttpException, Param, Get } from '@nestjs/common';
import { Injectable, Inject, Query } from '@nestjs/common';
import { NestApplicationContextOptions } from '@nestjs/common/interfaces/nest-application-context-options.interface';
import axios from 'axios';
import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';


interface SSOReturn {
    access_token: string;
    expires_in: string;
    refresh_token: string;
    created_at: string;
}
@Controller('users')
@Injectable()
export class UsersController {
    constructor(private readonly httpService: HttpService) {}

    @Post('/auth')
    auth(@Body() body: { code: string }): { token: string } {
        console.log(this.getToken());
        return
        {
            token: "kek"
        };
    }

    getToken(): Observable<AxiosResponse<SSOReturn>> {
        return this.httpService.get('https://api.intra.42.fr/oauth/token');
    }
}