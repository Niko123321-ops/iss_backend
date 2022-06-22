import {BadRequestException, Body, Controller, NotFoundException, Post, Res, UseGuards} from '@nestjs/common';
import {UserService} from "../user/user.service";
import {JwtService} from "@nestjs/jwt";
import {RegisterDto} from "./register.dto";
import * as bcrypt from 'bcrypt';
import {LoginDto} from "./login.dto";
import {Response} from 'express';
import {AuthGuard} from "./auth.guard";


@Controller('auth')
export class AuthController {

    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {
    }

        @Post('register')
        async register(@Body() data: RegisterDto) {
            const hashed = await bcrypt.hash(data.pass, 12);
            return this.userService.create({
                "user": data.user,
                "email": data.email,
                "pass": hashed
        });
    }

    @Post('login')
    async login(@Body() data: LoginDto,
                @Res({passthrough: true}) response: Response) {
        const user = await this.userService.findOne({user: data.user});
        if (!user) {
            throw new NotFoundException('Uporabnik ne obstaja');
        }

        if (!await bcrypt.compare(data.pass, user.pass)) {
            throw new BadRequestException('Napačno geslo');
        }

        const jwt = await this.jwtService.signAsync({id: user.id});

        response.cookie('jwt',jwt,{httpOnly:true});

        return user;
    }

    @UseGuards(AuthGuard)
    @Post('logout')
    logout(@Res({passthrough:true}) response: Response) {
        response.clearCookie('jwt');
        return {
            message: 'Success'
        }
    }
}