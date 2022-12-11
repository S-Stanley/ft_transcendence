import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Matchmaking {
    @PrimaryGeneratedColumn()
        id: number;

    @Column({
        nullable: false
    })
        id_42: number;

    @Column({
        default: new Date(),
        nullable: false
    })
        created_at: Date;
}