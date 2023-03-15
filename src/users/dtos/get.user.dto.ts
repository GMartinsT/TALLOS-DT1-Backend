import { IsNotEmpty } from "class-validator";

export class getUser {
    @IsNotEmpty({ message: 'Nome é obrigatótio' })
    name: string;
}