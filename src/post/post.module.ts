import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Post} from "./post.entity";
import {CommonModule} from "../common/common.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    CommonModule
  ],
  providers: [PostService],
  controllers: [PostController]
})
export class PostModule {}
