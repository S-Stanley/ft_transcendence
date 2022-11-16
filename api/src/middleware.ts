import { Injectable, NestMiddleware, Inject, HttpException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { isValidUUIDV4 } from 'is-valid-uuid-v4';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {

    constructor(@Inject("PG_CONNECTION") private db: any){}

    async use(req: Request, res: Response, next: NextFunction) {
        const token = req.headers?.authorization;
        if (!token) {
            throw new HttpException('No token was provided.', 401);
        }
        else if (!token.includes('Bearer ')) {
            throw new HttpException('Token should have prefix Bearer.', 401);
        }
        next();
    }
}
