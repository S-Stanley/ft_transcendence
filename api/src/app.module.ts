import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './config';

@Module({
    imports: [ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: ".env",
      }),
      DbModule
    ],
    controllers: [AppController, UsersController],
    providers: [AppService],
})
export class AppModule {}
