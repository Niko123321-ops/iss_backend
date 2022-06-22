import {IsNotEmpty, IsString} from "class-validator";

export class ReplyPostDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    content:string;

    @IsNotEmpty()
    reply_id: number;
}