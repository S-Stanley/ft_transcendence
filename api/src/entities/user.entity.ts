import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string

    @Column()
    nickname: string

    @Column()
    access_token: string

    @Column()
    refresh_token: string

    @Column()
    token_expires_at: Date

    @Column({
        nullable: true
    })
    pass: string

    @Column({
        default: new Date()
    })
    created_at: Date
}