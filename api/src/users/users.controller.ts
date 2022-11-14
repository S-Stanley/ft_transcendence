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
        this.getToken(body.code).then((value) => {
            console.log(value);
        }, (error) => {
            console.error(error);
        });
        return
        {
            token: "kek"
        };
    }

    async getToken(code: string): Promise<AxiosResponse<SSOReturn>> {
        const axios = require('axios');
        const FormData = require('form-data');
        var bodyFormData = new FormData();
        bodyFormData.append('grant_type', 'authorization_code');
        bodyFormData.append('client_id', 'u-s4t2ud-6694130f6db913ca3cd2ea1112756a01c8af82f732601f915369707b205c3b1c');
        bodyFormData.append('client_secret', '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');
        bodyFormData.append('code', code);
        bodyFormData.append('redirect_uri', 'http://localhost:3000/oauth2-redirect');
        console.log(bodyFormData)
        const response = await this.httpService.post(
            'https://api.intra.42.fr/oauth/token',
            bodyFormData,
            { headers: bodyFormData.getHeaders() }
          ).toPromise();
          console.log(response.data);
          return response.data;
        // var config = {
        //     method: 'post',
        //     url: 'https://api.intra.42.fr/oauth/token',
        //     headers: { 
        //       'Cookie': '_intra_42_session_production=119bd8710674aedd5136214a8f98ad9e; _mkra_stck=76c872e3efb1aee4e241b156a75a27f2%3A1668394038.2087028', 
        //       ...bodyFormData.getHeaders()
        //     },
        //     data : bodyFormData
        //   };
          
        //   const respons = axios(config)
        // //   .then(function (response) {
        // //     console.log(JSON.stringify(response.data));
        // //   })
        // //   .catch(function (error) {
        // //     console.log(error);
        // //   });
        //   return respons.data;
    }
}