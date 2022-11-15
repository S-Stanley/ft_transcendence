import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string

    @Column()
    nickname: string

    @Column()
    accessToken: string

    @Column()
    refreshToken: string

    @Column()
    tokenExpiresAt: Date
}