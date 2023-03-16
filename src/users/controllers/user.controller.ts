import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CreateUserDto } from "../dtos/create.user.dto";
import { UpdateUserDto } from "../dtos/update.user.dto";
import { User } from "../models/user.model"
import { UserService } from "../services/user.service";

@Controller('users')
export class UserController {

    constructor(private userService: UserService) {}

    @Get()
    async getAll() : Promise<User[]> {
        return this.userService.getAll();
    }

    @Get(':id')
    async getById(@Param('id') id: string) : Promise<User> {
        return this.userService.getById(id);
    }

    @Get(':email')
    async getByEmail(@Param('email') email: string) : Promise<User> {
        return this.userService.getByEmail(email);
    }

    @Post()
    async create(@Body() user: CreateUserDto) {
        return this.userService.create(user);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(id, updateUserDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        this.userService.delete(id);
    }
}