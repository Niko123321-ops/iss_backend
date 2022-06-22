import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {IsNotEmpty} from "class-validator";
import {Post} from "../post/post.entity";


@Entity('categories')
export class Category{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({nullable: true})
    description: string;

    @CreateDateColumn()
    date_created: Date;

    @OneToMany(() => Post, (post) => post.category)
    posts: Post[];
}