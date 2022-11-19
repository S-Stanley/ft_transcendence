import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Message } from "./message.entity";
import { User } from "./user.entity";


@Entity()
export class Chat {
    @PrimaryGeneratedColumn()
    id: number

    @OneToMany(() => Message, message => message.chat)
    messages: Message[];

    @ManyToMany(() => User)
    @JoinTable()
    members: User[];

    @Column()
    @Unique(['name'])
    name: string
}