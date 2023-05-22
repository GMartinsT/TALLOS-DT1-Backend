import { Body, Controller, Delete, Get, Param, Post, UseGuards, Patch } from "@nestjs/common";
import { User } from "../models/user.model"
import { UserService } from "../services/user.service";
import { RolesGuard } from "../../auth/guards/role.guard";
import { Roles } from "../../auth/decorators/roles.decorator";
import { Role } from "../../auth/models/Role.enum";
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiBearerAuth } from "@nestjs/swagger";
import { LoginResponse } from "../../helpers/res.login.swagger";
import { SwaggerResponse } from "../../helpers/res.swagger";
import { UpdateUserDto } from "../models/user.update.dto";

@ApiTags('users')
@ApiBearerAuth('access-token')
@Controller('users')
export class UserController {

    constructor(private userService: UserService) { }

    @ApiOperation({ summary: 'Listar todos os usuários' })
    @ApiResponse({
        status: 200,
        description: 'Usuários retornados com sucesso',
        type: SwaggerResponse,
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
    @Roles(Role.Admin, Role.User)
    @UseGuards(RolesGuard)
    @Get()
    async getAll() {
        const users = await this.userService.getAll();
        return users.map(user => ({ email: user.email, name: user.name, role: user.role, _id: user._id }));
    }

    @ApiOperation({ summary: 'Listar usuário buscando por ID' })
    @ApiParam({ name: 'id' })
    @ApiResponse({
        status: 200,
        description: 'Usuário retornado com sucesso',
        type: LoginResponse
    })
    @ApiResponse({
        status: 401,
        description: 'Não autorizado - Nenhum usuário logado',
    })
    @ApiResponse({
        status: 404,
        description: 'Usuário não encontrado',
    })
    @Roles(Role.Admin, Role.User)
    @UseGuards(RolesGuard)
    @Get(':id')
    async getById(@Param('id') id: string) {
        const user = await this.userService.getById(id);
        const userData = {
            name: user.name,
            email: user.email,
            role: user.role,
        }
        return userData;
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
    @Roles(Role.Admin, Role.User)
    @UseGuards(RolesGuard)
    @Get('/email/:email')
    async getByEmail(@Param('email') email: string) {
        const user = await this.userService.getByEmail(email);
        const userData = {
            name: user.name,
            email: user.email,
            role: user.role,
        }
        return userData;
    }

    @ApiOperation({ summary: 'Registrar um novo usuário' })
    @ApiBody({ type: User })
    @ApiResponse({
        status: 201,
        description: 'Usuário registrado com sucesso',
        type: SwaggerResponse
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
    @Roles(Role.Admin)
    @UseGuards(RolesGuard)
    @Post()
    async create(@Body() createUserDTO: User) {
        const user = await this.userService.create(createUserDTO);
        //const { password, ...result } = user;
        const userData = {
            name: user.name,
            email: user.email,
            role: user.role,
        }
        return userData;
    }

    @ApiOperation({ summary: 'Atualizar um usuário' })
    @ApiParam({ name: 'id' })
    @ApiResponse({
        status: 200,
        description: 'Usuário atualizado com sucesso',
        type: SwaggerResponse
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
    @Roles(Role.Admin)
    @UseGuards(RolesGuard)
    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        const { updatedUser, user } = await this.userService.update(id, updateUserDto);
        const { password, ...result } = user;
        return result;
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
    @Roles(Role.Admin)
    @UseGuards(RolesGuard)
    @Delete(':id')
    async delete(@Param('id') id: string) {
        this.userService.delete(id);
    }
}