import { IsNotEmpty } from "class-validator";
import { IsEmail } from "class-validator/types/decorator/decorators";

export class userDTO {
    id?: string;

    @IsNotEmpty({ message: 'Nome é obrigatório' })
    name: string;

    @IsNotEmpty({ message: 'E-mail é obrigatório' })
    @IsEmail(undefined, { message: 'Precisa ser um e-mail válido' })
    email: string;

    @IsNotEmpty({ message: 'Senha obrigatória' })
    password: string;

    role: string;
}