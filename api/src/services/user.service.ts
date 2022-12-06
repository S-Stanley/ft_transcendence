import { HttpException, Inject, Injectable } from "@nestjs/common";
import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "src/entities/user.entity";
import { History } from "src/entities/history.entity";
import { Repository } from "typeorm";
import { firstValueFrom } from "rxjs";
import { UserDTO } from "src/dtos/profile.dto";
import { SSOReturn } from "src/dtos/ssoreturn.dto";
import { UserAuth } from "src/dtos/userauth";
import { User42 } from 'src/dtos/user42.dto';
import FormData = require('form-data');

@Injectable()
export class UserService {
    constructor(@Inject("PG_CONNECTION") private db: any,private readonly httpService: HttpService, @InjectRepository(Users) private userRepository: Repository<Users>, @InjectRepository(History) private historyRepository: Repository<History>) {}

    async authUser(code: string): Promise<UserAuth> {
        const token = await this.getToken(code);
        const user42 = await this.getUserInformationFrom42(token.data.access_token);
        let user = await this.userRepository.findOneBy({
            id_42: user42.id
        });
        if (!user) {
            user = new Users();
            user.id_42 = user42.id;
            user.email = user42.email;
            user.nickname = user42.login;
            user.pass = '';
            user.avatar = user42.image.link;
        }
        user.access_token = token.data.access_token;
        user.refresh_token = token.data.refresh_token;
        user.token_expires_at = new Date((token.data.created_at + token.data.expires_in) * 1000);
        const usr = await this.userRepository.save(user);
        return ({
            id_42: usr.id_42,
            token: usr.access_token,
            email: usr.email,
            user_id: usr.id.toString(),
            nickname: usr.nickname,
            avatar: usr.avatar,
        });
    }

    getToken(code: string): Promise<any> {
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

    getOwnProfile(user: Users): UserDTO {
        return {
            id_42: user.id_42,
            email: user.email,
            nickname: user.nickname,
            avatar: user.avatar
        };
    }

    async getUserProfile(nickname: string): Promise<UserDTO> {
        const user = await this.userRepository.findOneBy({
            nickname: nickname
        });
        return {
            id_42: user.id_42,
            email: user.email,
            nickname: user.nickname,
            avatar: user.avatar
        };
    }

    async findUserFromEmail(email:string): Promise<number> {
        const data = await this.db.query(`SELECT * FROM users WHERE email='${email}'`)
            .then((result: { rows: any }) => {
                if (result.rows.length === 0) {
                    throw new HttpException('Cant find id of the user', 500);
                } else {
                    return ({user_id: result.rows[0].id,});
                }
            });
        return (data.user_id);
    }

}