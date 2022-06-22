import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Category} from "./category.entity";
import {Repository} from "typeorm";

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category) private readonly categoryRepository: Repository<Category>
    ) {
    }

    getAll(): Promise<Category[]> {
        return this.categoryRepository.find();
    }

    findOne(id:number): Promise<Category> {
        return this.categoryRepository.findOne({id});
    }

    create(data): Promise<Category> {
        return this.categoryRepository.save(data);
    }

    delete(id:number) {
        this.categoryRepository.delete({id});
    }

    async update(id: number, data): Promise<Category> {
        await this.categoryRepository.update(id, data);
        return this.findOne(id);
    }
}
