import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Chat } from "src/entities/chat.entity";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class ChatService {
    constructor(
        @InjectRepository(Chat) private chatRepository: Repository<Chat>,
        @InjectRepository(User) private userRepository: Repository<User>
    ) {}

    async createChat(name: string, token: string) : Promise<Chat> {
        const user = await this.userRepository.findOneBy({ accessToken: token });
        if (user == undefined) {
            throw new HttpException('User not found.', 400);
        }
        const chatExist = await this.chatRepository.findOneBy({ name: name });
        if (chatExist != null) {
            throw new HttpException('Chat already exists.', 400);
        }
        const chat = new Chat();
        chat.name = name;
        chat.members = [];
        chat.members.push(user);
        return this.chatRepository.save(chat);
    }
}