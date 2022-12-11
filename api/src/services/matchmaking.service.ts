import { Inject, Injectable } from "@nestjs/common";
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from "@nestjs/typeorm";
import { Matchmaking } from "src/entities/matchmaking.entity";
import { Repository } from "typeorm";
import { MatchmakingRequest } from 'src/dtos/matchmaking.dto';

@Injectable()
export class MatchmakingService {
    constructor(@Inject("PG_CONNECTION") private db: any, private readonly httpService: HttpService, @InjectRepository(Matchmaking) private matchmakingRepository: Repository<Matchmaking>) {}

    async addMatchmaking(id_42:number): Promise<MatchmakingRequest> {
        const match = new Matchmaking();
        match.id_42 = id_42;
        const res = await this.matchmakingRepository.save(match);
        return (res);
    }

    async cancelMatchmaking(id_42:number): Promise<null> {
        await this.db.query(`DELETE FROM public.matchmaking WHERE id_42='${id_42}'`);
        return (null);
    }

    async findMatchmaking(): Promise<MatchmakingRequest> {
        const res = await this.db.query(`SELECT * FROM public.matchmaking ORDER BY created_at ASC`)
            .then((result: { rows: any }) => {
                return ({
                    result: result.rows,
                });
            })
            .catch((e: any) => {
                console.error(e);
                return ({
                    result: [],
                });
            });
        return (res);
    }
}