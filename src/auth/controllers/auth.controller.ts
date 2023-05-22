import { Controller, UseGuards, Request, Post, HttpCode, HttpStatus } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { LocalAuthGuard } from "../guards/local.auth.guard";
import { AuthRequest } from "../models/AuthRequest";
import { IsPublic } from "../decorators/is.public.decorator";
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from "@nestjs/swagger";
import { LoginRequest } from "../../helpers/req.login.swagger";
import { LoginResponse } from "../../helpers/res.login.swagger";

@ApiTags('login')
@Controller()
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiOperation({ summary: 'Realizar login' })
    @ApiBody({ type: LoginRequest })
    @ApiResponse({
        status: 200,
        description: 'Usuário logado com sucesso',
        type: LoginResponse
    })
    @ApiResponse({
        status: 400,
        description: 'Bad Request - Dados inválidos',
    })
    @IsPublic()
    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    @HttpCode(HttpStatus.OK)
    async login(@Request() req: AuthRequest) {
        return this.authService.login(req.user)
    }
}