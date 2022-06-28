import { Module } from '@nestjs/common';
import {JwtModule} from "@nestjs/jwt";

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'secret',
            signOptions: { expiresIn: '1m' },
        }),
    ],
    exports: [
        JwtModule
    ]
})
export class CommonModule {}
