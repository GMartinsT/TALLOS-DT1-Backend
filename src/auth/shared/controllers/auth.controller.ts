import { Controller, UseGuards, Request, Post, HttpCode, HttpStatus } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { LocalAuthGuard } from "../guards/local.auth.guard";


@Controller()
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    @HttpCode(HttpStatus.OK)
    async login(@Request() req: any) {
        return this.authService.login(req.User)
    }
}