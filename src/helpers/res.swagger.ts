import { ApiProperty } from "@nestjs/swagger";
import { Role } from "../auth/models/Role.enum";

export class SwaggerResponse {

    @ApiProperty({
        example: 'Guilherme Martins',
        description: 'Nome do usuário cadastrado.'
    })
    name: string;

    @ApiProperty({
        example: 'email@mail.com',
        description: 'E-mail cadastrado para realizar login.'
    })
    email: string;

    @ApiProperty({
        enum: ['Admin', 'User'],
        example: 'User',
        description: 'Define as permissões do usuário na API.'
    })
    role?: Role;

    @ApiProperty({
        example: '12345a67b89cde10',
        description: 'Número de identificação do usuário'
    })
    _id?: string
}