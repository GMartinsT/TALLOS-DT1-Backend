import { IsNotEmpty, IsString } from "class-validator"

export class LoginDto {
    @IsNotEmpty({ message: 'E-mail é obrigatório' })
    @IsString()
    email: string;

    @IsNotEmpty({ message: 'Senha é obrigatório' })
    password: string;
}