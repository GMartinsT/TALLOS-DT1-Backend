import { Controller, UseGuards, Request, Post, HttpCode, HttpStatus } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { LocalAuthGuard } from "../guards/local.auth.guard";
import { AuthRequest } from "../models/AuthRequest";
import { IsPublic } from "../decorators/is.public.decorator";


@Controller()
export class AuthController {
    constructor(private authService: AuthService) {}

    @IsPublic()
    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    @HttpCode(HttpStatus.OK)
    async login(@Request() req: AuthRequest) {
        return this.authService.login(req.user)
    }
}