import { Controller, Post, Get, Inject, Body } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { MatchmakingRequest } from 'src/dtos/matchmaking.dto';
import { MatchmakingService } from '../services/matchmaking.service';

@Controller('matchmaking')
@Injectable()
export class MatchmakingController {
    constructor(@Inject("PG_CONNECTION") private db: any, private matchmakingService: MatchmakingService) {}

    @Post('/add')
    addMatch(@Body() body: {id_42:number}): Promise<MatchmakingRequest> {
        return this.matchmakingService.addMatchmaking(body.id_42);
    }

    @Post('/cancel')
    cancelMatch(@Body() body: {id_42:number}): Promise<null> {
        return this.matchmakingService.cancelMatchmaking(body.id_42);
    }

    @Get('/requests')
    getMatch(): Promise<MatchmakingRequest> {
        return this.matchmakingService.findMatchmaking();
    }
}