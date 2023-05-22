import { Prop } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional } from "class-validator";
import { Role } from "../../auth/models/Role.enum";

export class UpdateUserDto {
    @ApiProperty({
        example: 'Guilherme Martins',
        description: 'Nome do usuário cadastrado.'
    })
    @Prop()
    @IsOptional({ message: 'Preencha com seu nome de usuário.' })
    name: string;

    @ApiProperty({
        example: 'email@mail.com',
        description: 'E-mail cadastrado para realizar login.'
    })
    @Prop({ unique: true })
    @IsEmail({}, { message: 'Preencha com um e-mail válido.' })
    email: string;

    @ApiProperty({
        example: 'abc123',
        description: 'Senha cadastrada para realizar login.'
    })
    @Prop()
    @IsOptional({ message: 'Preencha com a sua senha do usuário.' })
    password: string;

    @ApiProperty({
        enum: ['Admin', 'User'],
        example: 'User',
        description: 'Define as permissões do usuário na API.'
    })
    @Prop()
    @IsOptional({ message: 'Preencha com o cargo do usuário.' })
    role?: Role;
}