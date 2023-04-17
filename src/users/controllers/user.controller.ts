import { Body, Controller, Delete, Get, Param, Put, Post } from "@nestjs/common";
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

    @Get('/email/:email')
    async getByEmail(@Param('email') email: string) : Promise<User> {
        return this.userService.getByEmail(email);
    }

    @Post()
    async create(@Body() createUserDTO: User) {
        return this.userService.create(createUserDTO);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateUserDto: User) {
        return this.userService.update(id, updateUserDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        this.userService.delete(id);
    }
}