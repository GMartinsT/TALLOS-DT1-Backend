import { Body, Controller, Delete, Get, Param, Put, Post, UseGuards } from "@nestjs/common";
import { User } from "../models/user.model"
import { UserService } from "../services/user.service";
import { RolesGuard } from "src/auth/guards/role.guard";
import { Roles } from "src/auth/decorators/roles.decorator";
import { Role } from "src/auth/models/Role.enum";
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from "@nestjs/swagger";

@ApiTags('users')
@Controller('users')
export class UserController {

    constructor(private userService: UserService) { }

    @ApiOperation({ summary: 'Listar todos os usuários' })
    @ApiResponse({
        status: 200,
        description: 'Usuários retornados com sucesso',
        type: User,
        isArray: true
    })
    @ApiResponse({
        status: 401,
        description: 'Não autorizado - Nenhum usuário logado',
    })
    @ApiResponse({
        status: 404,
        description: 'Usuários não encontrados',
    })
    //@Roles(Role.Admin, Role.User)
    //@UseGuards(RolesGuard)
    @Get()
    async getAll(): Promise<User[]> {
        return this.userService.getAll();
    }

    @ApiOperation({ summary: 'Listar usuário buscando por ID' })
    @ApiParam({ name: 'id' })
    @ApiResponse({
        status: 200,
        description: 'Usuário retornado com sucesso',
        type: User
    })
    @ApiResponse({
        status: 401,
        description: 'Não autorizado - Nenhum usuário logado',
    })
    @ApiResponse({
        status: 404,
        description: 'Usuário não encontrado',
    })
    //@Roles(Role.Admin, Role.User)
    //@UseGuards(RolesGuard)
    @Get(':id')
    async getById(@Param('id') id: string): Promise<User> {
        return this.userService.getById(id);
    }

    @ApiOperation({ summary: 'Listar usuário buscando por e-mail' })
    @ApiParam({ name: 'email' })
    @ApiResponse({
        status: 200,
        description: 'Usuário retornado com sucesso',
        type: User
    })
    @ApiResponse({
        status: 401,
        description: 'Não autorizado - Nenhum usuário logado',
    })
    @ApiResponse({
        status: 404,
        description: 'Usuário não encontrado',
    })
    //@Roles(Role.Admin, Role.User)
    //@UseGuards(RolesGuard)
    @Get('/email/:email')
    async getByEmail(@Param('email') email: string): Promise<User> {
        return this.userService.getByEmail(email);
    }

    @ApiOperation({ summary: 'Registrar um novo usuário' })
    @ApiBody({ type: User })
    @ApiResponse({
        status: 201,
        description: 'Usuário registrado com sucesso',
        type: User
    })
    @ApiResponse({
        status: 400,
        description: 'Bad Request - O usuário já existe',
    })
    @ApiResponse({
        status: 400,
        description: 'Bad Request - Dados inválidos',
    })
    @ApiResponse({
        status: 403,
        description: 'Não autorizado - O usuário não autorizado',
    })
    //@Roles(Role.Admin)
    //@UseGuards(RolesGuard)
    @Post()
    async create(@Body() createUserDTO: User) {
        return this.userService.create(createUserDTO);
    }

    @ApiOperation({ summary: 'Atualizar um usuário' })
    @ApiParam({ name: 'id' })
    @ApiResponse({
        status: 200,
        description: 'Usuário atualizado com sucesso',
        type: User
    })
    @ApiResponse({
        status: 400,
        description: 'Bad Request - O usuário já existe',
    })
    @ApiResponse({
        status: 400,
        description: 'Bad Request - Dados inválidos',
    })
    @ApiResponse({
        status: 403,
        description: 'Não autorizado - O usuário não autorizado',
    })
    @ApiResponse({
        status: 404,
        description: 'Usuário não encontrado',
    })
    //@Roles(Role.Admin)
    //@UseGuards(RolesGuard)
    @Put(':id')
    async update(@Param('id') id: string, @Body() updateUserDto: User) {
        return this.userService.update(id, updateUserDto);
    }

    @ApiOperation({ summary: 'Deletar um usuário' })
    @ApiParam({ name: 'id' })
    @ApiResponse({
        status: 200,
        description: 'Usuário deletado com sucesso'
    })
    @ApiResponse({
        status: 401,
        description: 'Não autorizado - Nenhum usuário logado',
    })
    @ApiResponse({
        status: 403,
        description: 'Não autorizado - O usuário não autorizado',
    })
    @ApiResponse({
        status: 404,
        description: 'Usuário não encontrado',
    })
    //@Roles(Role.Admin)
    //@UseGuards(RolesGuard)
    @Delete(':id')
    async delete(@Param('id') id: string) {
        this.userService.delete(id);
    }
}