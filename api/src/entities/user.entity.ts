import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

/* By default, the field nullable is set by true. To be more explicit
on the scope of this project, we add this field*/

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false
    })
    email: string

    @Column({
        nullable: false
    })
    nickname: string

    @Column({
        nullable: false
    })
    access_token: string

    @Column({
        nullable: false
    })
    refresh_token: string

    @Column({
        nullable: false
    })
    token_expires_at: Date

    @Column({
        nullable: true
    })
    pass: string

    @Column({
        default: new Date(),
        nullable: false
    })
    created_at: Date

    @Column({
        nullable: false
    })
    avatar: string
}