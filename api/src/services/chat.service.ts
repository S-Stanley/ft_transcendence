import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Chat } from "src/entities/chat.entity";
import { Message } from "src/entities/message.entity";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class ChatService {
    constructor(
        @InjectRepository(Chat) private chatRepository: Repository<Chat>,
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Message) private messageRepository: Repository<Message>
    ) {}

    async createChat(name: string, user: User): Promise<Chat> {
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

    async getChat(name: string): Promise<Chat> {
        const chat =  await this.chatRepository.findOne({
            where: { name: name },
            relations: { members: true, messages: true }
        });
        if (chat == undefined) {
            throw new HttpException('Chat not found.', 400);
        }
        return chat;
    }

    async sendMessage(messageContent: string, name: string, user: User): Promise<Message> {
        const chat = await this.chatRepository.findOneBy({ name: name });
        if (chat == undefined) {
            throw new HttpException('Chat not found.', 400);
        }
        const message = new Message();
        message.text = messageContent;
        message.author = user;
        message.chat = chat;
        return this.messageRepository.save(message);
    }
}