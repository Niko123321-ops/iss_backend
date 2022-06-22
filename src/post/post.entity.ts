import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne, OneToMany,
    PrimaryGeneratedColumn
} from "typeorm";
import {User} from "../user/user.entity";
import {Category} from "../category/category.entity";
import {IsNotEmpty} from "class-validator";


@Entity('posts')
export class Post{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column({nullable: true})
    alias: string;

    @CreateDateColumn()
    date_created: Date;

    @DeleteDateColumn({nullable: true})
    date_deleted: Date;

    @ManyToOne(() => User, (user) => user.posts, {eager: true})
    @JoinColumn({name: 'user_id'})
    user: User;

    @ManyToOne(() => Category, (category) => category.posts, {eager: true})
    @JoinColumn({name: 'category_id'})
    category: Category;

    @ManyToOne(() => Post, post => post.parent_posts)
    @JoinColumn({name: 'reply_id'})
    child_posts: Post;

    @OneToMany(() => Post, post => post.child_posts)
    parent_posts: Post[];
}