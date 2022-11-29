import { Injectable, NestMiddleware, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response, NextFunction } from 'express';
import { Repository } from 'typeorm';
import { Users } from './entities/user.entity';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    constructor(@InjectRepository(Users) private userRepository: Repository<Users>) {}

    async use(req /*Request*/, res: Response, next: NextFunction) {
        const token = req.headers?.authorization;
        if (!token) {
            throw new HttpException('No token was provided.', 401);
        }
        else if (!token.includes('Bearer ')) {
            throw new HttpException('Token should have prefix Bearer.', 401);
        }
        const user = await this.userRepository.findOneBy({ access_token: token.split('Bearer ')[1] });
        if (user == undefined || user == null) {
            throw new HttpException('Invalid token.', 401);
        }
        //si date depasse -> recree un token
        req.user = user;
        next();
    }
}
