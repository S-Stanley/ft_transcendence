import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Chat {
    @PrimaryGeneratedColumn("uuid")
        id: string;

    @Column({
        nullable: false
    })
        name: string;

    @Column({
        nullable: false
    })
        created_by: string;
}