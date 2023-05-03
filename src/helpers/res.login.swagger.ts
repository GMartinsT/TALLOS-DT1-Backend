import { ApiProperty } from "@nestjs/swagger";
import { Role } from "src/auth/models/Role.enum";
import { User } from "src/users/models/user.model";

export class LoginResponse {
    @ApiProperty({ description: 'Nome do usuário cadastrado.' })
    access_token: string

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
        example: 'abc123',
        description: 'Senha cadastrada para realizar login.'
    })
    password: string;

    @ApiProperty({
        enum: ['Admin', 'User'],
        example: 'User',
        description: 'Define as permissões do usuário na API.'
    })
    role?: Role;
}