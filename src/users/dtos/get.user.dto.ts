import { IsNotEmpty } from "class-validator";

export class getUser {
    @IsNotEmpty({ message: 'E-mail é obrigatório' })
    email: string;

    @IsNotEmpty({ message: 'Nome é obrigatótio' })
    name: string;
}