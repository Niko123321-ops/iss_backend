import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CommonModule} from "../common/common.module";
import {Category} from "./category.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Category]),
    CommonModule
  ],
  providers: [CategoryService],
  controllers: [CategoryController]
})
export class CategoryModule {}
