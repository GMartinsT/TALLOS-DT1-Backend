import { IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
    @IsNotEmpty({ message: 'E-mail é obrigatório' })
    email: string;
    
    name: string;

    @IsNotEmpty({ message: 'Senha é obrigatória' })
    password: string;

    role: string;
}