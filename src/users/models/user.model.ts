import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsEmail, IsNotEmpty } from "class-validator";

export interface UserModel {
    name: string;
    email:string;
    password: string;
    role?: string;
}

export type UserDocument = User & Document;
@Schema()
export class User implements UserModel {
    @Prop({ required: true })
    @IsNotEmpty({ message: 'Preencha com seu nome de usuário.' })
    name: string;

    @Prop({ required: true, unique: true })
    @IsEmail({}, { message: 'Preencha com um e-mail válido.' })
    email: string;

    @Prop({ required: true })
    @IsNotEmpty({ message: 'Preencha com a sua senha do usuário.' })
    password: string;

    @Prop({ required: true })
    @IsNotEmpty({ message: 'Preencha com o cargo do usuário.' })
    role?: string;

    constructor(User?: Partial<User>) {
        this.name = User?.name;
        this.email = User?.email;
        this.password = User?.password;
        this.role = User?.role;
    }
}

export const UserSchema = SchemaFactory.createForClass(User);