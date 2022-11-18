import { User } from "./user.entity"
import { Chat } from "./chat.entity"
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Message 
{
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, user => user.id)
    author: User;

    @Column()
    text: string;

    @ManyToOne(() => Chat, chat => chat.id)
    chat: Chat;
}