import { Injectable, NestMiddleware, Inject, HttpException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { isValidUUIDV4 } from 'is-valid-uuid-v4';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {

    constructor(@Inject("PG_CONNECTION") private db: any){}

    async use(req: Request, res: Response, next: NextFunction) {
        const token = req.headers?.token;
        if (!token) {
            throw new HttpException('No token was provided', 401);
        }
        else if (typeof(token) != 'string') {
            throw new HttpException('Token header should be of type string', 401);
        }
        else if (!isValidUUIDV4(token)) {
            throw new HttpException('Token is not in UUID format', 401);
        }
        else {
            const sql = await this.db.query('SELECT * FROM public.users WHERE token=$1', [token]);
            if (sql.rows.length === 0) {
                throw new HttpException('Wrong token', 401);
            }
            next();
        }
    }
}
