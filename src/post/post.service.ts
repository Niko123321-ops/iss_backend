import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Post} from "./post.entity";
import {Repository} from "typeorm";

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post) private readonly postRepository: Repository<Post>
    ) {
    }

    getAll(): Promise<Post[]> {
        return this.postRepository.find();
    }

    create(data): Promise<Post> {
        return this.postRepository.save(data);
    }


    findOne(id: number): Promise<Post> {
        return this.postRepository.findOne(id);
    }

    async update(id:number,data): Promise<Post> {
        await this.postRepository.update(id,data);

        return this.findOne(id);
    }

    delete(id:number) {
        return this.postRepository.delete({id});
    }
}
