import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsEmail, IsNotEmpty } from "class-validator";
import { Role } from "src/auth/models/Role.enum";
import { ApiProperty } from '@nestjs/swagger'

export interface UserModel {
    name: string;
    email:string;
    password?: string;
    role?: Role;
}

export type UserDocument = User & Document;
@Schema()
export class User implements UserModel {
    @ApiProperty({
        example: 'Guilherme Martins',
        description: 'Nome do usuário cadastrado.'
    })
    @Prop({ required: true })
    @IsNotEmpty({ message: 'Preencha com seu nome de usuário.' })
    name: string;

    @ApiProperty({
        example: 'email@mail.com',
        description: 'E-mail cadastrado para realizar login.'
    })
    @Prop({ required: true, unique: true })
    @IsEmail({}, { message: 'Preencha com um e-mail válido.' })
    email: string;

    @ApiProperty({
        example: 'abc123',
        description: 'Senha cadastrada para realizar login.'
    })
    @Prop({ required: true })
    @IsNotEmpty({ message: 'Preencha com a sua senha do usuário.' })
    password: string;

    @ApiProperty({
        enum: ['Admin', 'User'],
        example: 'User',
        description: 'Define as permissões do usuário na API.'
    })
    @Prop({ required: true })
    @IsNotEmpty({ message: 'Preencha com o cargo do usuário.' })
    role?: Role;

    constructor(User?: Partial<User>) {
        this.name = User?.name;
        this.email = User?.email;
        this.password = User?.password;
        this.role = User?.role;
    }
}

export const UserSchema = SchemaFactory.createForClass(User);