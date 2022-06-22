import {IsNotEmpty, IsString} from "class-validator";

export class CreatePostDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    content:string;

    @IsNotEmpty()
    category_id: number;
}