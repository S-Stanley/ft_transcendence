import { Injectable } from "@nestjs/common";
import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";
import { firstValueFrom } from "rxjs";

interface SSOReturn {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    created_at: number;
}

interface User42 {
    login: string
    email: string
}

@Injectable()
export class UserService {
    constructor(private readonly httpService: HttpService, @InjectRepository(User) private userRepository: Repository<User>) {}

    authUser(code: string): Promise<string | void> {
        const token = this.getToken(code).then((value) => {
            return this.getUserInformationFrom42(value.data.access_token).then((res) => {
                return this.userRepository.findOneBy({ email: res.email }).then((user) => {
                    if (user == null) {
                        user = new User();
                        user.email = res.email;
                        user.nickname = res.login;
                    }
                    user.accessToken = value.data.access_token;
                    user.refreshToken = value.data.refresh_token;
                    user.tokenExpiresAt = new Date((value.data.created_at + value.data.expires_in) * 1000)
                    this.userRepository.save(user);
                    return user.accessToken;
                })
            })
        }, (error) => {
            console.error(error);
        });
        return token;
    }

    getToken(code: string): Promise<AxiosResponse<SSOReturn>> {
        const axios = require('axios');
        const FormData = require('form-data');
        var bodyFormData = new FormData();
        bodyFormData.append('grant_type', 'authorization_code');
        bodyFormData.append('client_id', 'u-s4t2ud-6694130f6db913ca3cd2ea1112756a01c8af82f732601f915369707b205c3b1c');
        bodyFormData.append('client_secret', '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');
        bodyFormData.append('code', code);
        bodyFormData.append('redirect_uri', 'http://localhost:3000/oauth2-redirect');
        const response = firstValueFrom(this.httpService.post(
            'https://api.intra.42.fr/oauth/token',
            bodyFormData,
            { headers: bodyFormData.getHeaders() }
          ))
          return response;
    }

    getUserInformationFrom42(token: string): Promise<User42> {
        const user = firstValueFrom(this.httpService.get(
            'https://api.intra.42.fr/v2/me',
            {
                headers: { 
                    Authorization: 'Bearer ' + token
                }
            }
          )).then((res) => res.data)
          return user;
    }
}