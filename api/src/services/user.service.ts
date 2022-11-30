import { Injectable } from "@nestjs/common";
import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "src/entities/user.entity";
import { Repository } from "typeorm";
import { firstValueFrom } from "rxjs";
import { UserDTO } from "src/dtos/profile.dto";
import { SSOReturn } from "src/dtos/ssoreturn.dto";
import { TokenReturn } from "src/dtos/tokenreturn.dto";
import { User42 } from 'src/dtos/user42.dto';
import FormData = require('form-data');

@Injectable()
export class UserService {
    constructor(private readonly httpService: HttpService, @InjectRepository(Users) private userRepository: Repository<Users>) {}

    async authUser(code: string): Promise<TokenReturn> {
        const token = await this.getToken(code);
        const user42 = await this.getUserInformationFrom42(token.data.access_token);
        let user = await this.userRepository.findOneBy({
            email: user42.email
        });
        if (!user) {
            user = new Users();
            user.email = user42.email;
            user.nickname = user42.login;
            user.pass = '';
            user.avatar = user42.image.link;
        }
        user.access_token = token.data.access_token;
        user.refresh_token = token.data.refresh_token;
        user.token_expires_at = new Date((token.data.created_at + token.data.expires_in) * 1000);
        this.userRepository.save(user);
        return ({
            token: user.access_token
        });
    }

    getToken(code: string): Promise<AxiosResponse<SSOReturn>> {
        const bodyFormData = new FormData();
        bodyFormData.append('grant_type', 'authorization_code');
        bodyFormData.append('client_id', process.env.CLIENT_ID);
        bodyFormData.append('client_secret', process.env.CLIENT_SECRET);
        bodyFormData.append('code', code);
        bodyFormData.append('redirect_uri', 'http://localhost:3000/oauth2-redirect');
        const response = firstValueFrom(this.httpService.post(
            'https://api.intra.42.fr/oauth/token',
            bodyFormData, {
                headers: bodyFormData.getHeaders()
            }
        ));
        return response;
    }

    getUserInformationFrom42(token: string): Promise<User42> {
        const user = firstValueFrom(this.httpService.get(
            'https://api.intra.42.fr/v2/me', {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }
        )).then((res) => res.data);
        return user;
    }

    getProfile(user: Users): UserDTO {
        return {
            email: user.email,
            nickname: user.nickname
        };
    }
}