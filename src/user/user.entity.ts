import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Post} from "../post/post.entity";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    user: string;

    @Column()
    pass: string;

    @Column({unique: true})
    email: string;

    @Column({nullable: true})
    first_name: string;

    @Column({nullable: true})
    last_name: string;

    @Column({nullable: true})
    date_birth: Date;

    @CreateDateColumn()
    date_create: Date;

    @OneToMany(() => Post, (post) => post.user)
    posts: Post[];
}