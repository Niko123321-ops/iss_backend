import {IsEmail, IsNotEmpty} from "class-validator";

export class RegisterDto {
    @IsNotEmpty()
    user: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    pass: string;
}