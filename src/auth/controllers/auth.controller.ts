import { Controller, UseGuards, Request, Post, HttpCode, HttpStatus, Body } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { LocalAuthGuard } from "../guards/local.auth.guard";
import { AuthRequest } from "../models/AuthRequest";
import { IsPublic } from "../decorators/is.public.decorator";
import { LoginRequestBody } from "../models/LoginRequestBody";


@Controller()
export class AuthController {
    constructor(private authService: AuthService) {}

    @IsPublic()
    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() login: LoginRequestBody) {
        console.log("logReq", login)
        return this.authService.login({email: login.email, password: login.password})
    }
}