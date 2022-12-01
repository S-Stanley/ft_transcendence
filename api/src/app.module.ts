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
import { UserService } from './services/user.service';
import { SocketGateway } from './socket.gateway';
import { HistoryController } from './history/history.controller';
import { HistoryService } from './services/history.service';

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
            entities: [Users, History],               // On renseigne ici les entités voulant être mappées en base de données
        }),
        TypeOrmModule.forFeature([Users, History]),     // On renseigne ici les entités possédant un repository
        ],
    controllers: [AppController, UsersController, ChatController, HistoryController],
    providers: [AppService, UserService, SocketGateway, HistoryService],
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
