import { Body, Controller, Delete, Get, Param, Put, Post, UseGuards } from "@nestjs/common";
import { User } from "../models/user.model"
import { UserService } from "../services/user.service";
import { RolesGuard } from "src/auth/guards/role.guard";
import { Roles } from "src/auth/decorators/roles.decorator";
import { Role } from "src/auth/models/Role.enum";

@Controller('users')
export class UserController {

    constructor(private userService: UserService) {}

    //@Roles(Role.Admin, Role.User)
    @UseGuards(RolesGuard)
    @Get()
    async getAll() : Promise<User[]> {
        return this.userService.getAll();
    }

    @Roles(Role.Admin, Role.User)
    @UseGuards(RolesGuard)
    @Get(':id')
    async getById(@Param('id') id: string) : Promise<User> {
        return this.userService.getById(id);
    }

    @Roles(Role.Admin, Role.User)
    @UseGuards(RolesGuard)
    @Get('/email/:email')
    async getByEmail(@Param('email') email: string) : Promise<User> {
        return this.userService.getByEmail(email);
    }

    @Roles(Role.Admin)
    @UseGuards(RolesGuard)
    @Post()
    async create(@Body() createUserDTO: User) {
        return this.userService.create(createUserDTO);
    }

    @Roles(Role.Admin)
    @UseGuards(RolesGuard)
    @Put(':id')
    async update(@Param('id') id: string, @Body() updateUserDto: User) {
        return this.userService.update(id, updateUserDto);
    }

    @Roles(Role.Admin)
    @UseGuards(RolesGuard)
    @Delete(':id')
    async delete(@Param('id') id: string) {
        this.userService.delete(id);
    }
}