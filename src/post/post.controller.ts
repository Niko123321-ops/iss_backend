import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Req,
    UnauthorizedException, UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import {PostService} from "./post.service";
import {AuthGuard} from "../auth/auth.guard";
import {JwtService} from "@nestjs/jwt";
import {CreatePostDto} from "./create_post.dto";
import {Request} from 'express';
import { FileInterceptor} from '@nestjs/platform-express';
import {diskStorage} from 'multer';
import {extname} from 'path';
import {ReplyPostDto} from "./reply_post.dto";
import {UpdatePostDto} from "./update_post.dto";

//@UseGuards(AuthGuard)
@Controller('post')
export class PostController {

    constructor(
        private postService:PostService,
        private jwtService: JwtService) {
    }

    @Get()
    getAll () {
        return this.postService.getAll();
    }

    @Get('posts')
    getPosts(){
        return this.postService.findPosts();
    }

    @UseGuards(AuthGuard)
    @Post('create')
    async create (
        @Body() data: CreatePostDto,
        @Req() request: Request) {

        const jwt = request.cookies['jwt'];
        const user = await this.jwtService.verifyAsync(jwt);

        return this.postService.create({
            title: data.title,
            content: data.content,
            category: {id: data.category_id},
            user: {id: user.id}
        });
    }

    @UseGuards(AuthGuard)
    @Post('reply')
    async reply (
        @Body() data: ReplyPostDto,
        @Req() request: Request) {

        const jwt = request.cookies['jwt'];
        const user = await this.jwtService.verifyAsync(jwt);

        return this.postService.create({
            title: data.title,
            content: data.content,
            child_posts: {id: data.reply_id},
            user: {id: user.id}
        });
    }

    @UseGuards(AuthGuard)
    @Put('update/:id')
    async update(
        @Body() data: UpdatePostDto,
        @Param('id') id:number,
        @Req() request: Request
    ){
        const jwt = request.cookies['jwt'];
        const user = await this.jwtService.verifyAsync(jwt);

        return this.postService.update(
            id,
            {
                title: data.title,
                content: data.content
            }
        );
    }

    @UseGuards(AuthGuard)
    @Post('upload')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads',
            filename(_,file ,callback) {
                return callback(null, file.originalname);
            }
        })

    }))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        console.log(file);
    }

    @Get(':id')
    getOne(@Param('id') id:number) {
        return this.postService.findOne(id);
    }

    @Get('replies/:id')
    getReplies(@Param('id') id:number){
        return this.postService.findReplies(id);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    async delete (
        @Param('id') id:number,
        @Req() request: Request) {

        const jwt = request.cookies['jwt'];
        const user = await this.jwtService.verifyAsync(jwt);

        const post = await this.getOne(id);
        //preverim, če je lastnik
        if (post.user.id != user.id) {
            throw new UnauthorizedException('Nisi lastnik!');
        }

        return this.postService.delete(id);
    }
}
