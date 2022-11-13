import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './config';
import { LoggerMiddleware } from './middleware';
import { ChatController } from './chat/chat.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: ".env",
      }),
      DbModule,
      HttpModule
    ],
    controllers: [AppController, UsersController, ChatController],
    providers: [AppService],
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
