import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './config';
import { LoggerMiddleware } from './middleware';
import { ChatController } from './chat/chat.controller';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { History } from './entities/history.entity';
import { Matchmaking } from './entities/matchmaking.entity';
import { UserService } from './services/user.service';
import { SocketGateway } from './socket.gateway';
import { HistoryController } from './history/history.controller';
import { HistoryService } from './services/history.service';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MatchmakingController } from './matchmaking/matchmaking.controller';
import { MatchmakingService } from './services/matchmaking.service';
import { TwoFactorAuthController } from './two_factor_auth/two_factor_auth.controller';
import { TwoFactorAuthService } from './services/two_factor_auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { DiscussionController } from './discussions/discussion.controller';

@Module({
    imports:
        [ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: [".env", ".env.prod"],
        }),
        DbModule,
        HttpModule,
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: +process.env.POSTGRES_PORT,
            username: process.env.POSTGRES_USER,
            password: '',
            database: process.env.POSTGRES_DB,
            entities: [Users, History, Matchmaking],               // On renseigne ici les entités voulant être mappées en base de données
        }),
        TypeOrmModule.forFeature([Users, History, Matchmaking]),     // On renseigne ici les entités possédant un repository
        MulterModule.register({dest: './public',}),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'public'),
        }),
        TypeOrmModule.forFeature([Users, History]),     // On renseigne ici les entités possédant un repository
        MulterModule.register({dest: './public',}),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'public'),
        }),
        JwtModule.register({
            secret: 'secret',
            signOptions: { expiresIn: '1d' },
        }),
        ],
    controllers: [AppController, UsersController, ChatController, HistoryController, MatchmakingController, TwoFactorAuthController, DiscussionController],
    providers: [AppService, UserService, SocketGateway, HistoryService, MatchmakingService, TwoFactorAuthService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware)
            .forRoutes({
                path: '/users/:email',
                method: RequestMethod.GET
            }, {
                path: '/chat*',
                method: RequestMethod.GET
            }, {
                path: '/chat*',
                method: RequestMethod.POST
            }, {
                path: '/history*',
                method: RequestMethod.GET,
            });
    }
}
