import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './config';
import { LoggerMiddleware } from './middleware';
import { ChatController } from './controllers/chat.controller';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './services/user.service';
import { SocketGateway } from './socket.gateway';
import { Chat } from './entities/chat.entity';
import { Message } from './entities/message.entity';
import { ChatService } from './services/chat.service';

@Module({
    imports: [ConfigModule.forRoot({
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
        entities: [User, Chat, Message],               // On renseigne ici les entités voulant être mappées en base de données
        synchronize: true
      }),
      TypeOrmModule.forFeature([User, Chat, Message]),     // On renseigne ici les entités possédant un repository
    ],
    controllers: [UsersController, ChatController],
    providers: [ChatService, UserService, SocketGateway],
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
            });
    }
}
