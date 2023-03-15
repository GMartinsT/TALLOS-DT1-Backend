import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { userDTO } from "../dtos/create.user.dto";
import { User } from "../models/user.model";
import * as bcrypt from 'bcryptjs';
import { UpdateUserDto } from "../dtos/update.user.dto";

@Injectable()
export class UserService {

    constructor(@InjectModel('User') private userModel: Model<User>) {}

    async getAll() {
        return await this.userModel.find().exec();
    }

    async getByEmail(email: string) {
        return await this.userModel.findOne({ email }).exec();
    }

    async getById(id: string) {
        return await this.userModel.findById(id).exec();
    }

    async create(user: userDTO) {
        user.password = await bcrypt.hash(user.password, 10)
        const createdUser = new this.userModel(user);
        return await createdUser.save();
    }

    async update(id: string, user: UpdateUserDto) {
        const updatedUser = await this.userModel.updateOne(
            { _id: id },
            {$set: user},
            {new: true}
            )
        return updatedUser
    }

    async delete(id: string) {
        return await this.userModel.deleteOne({ _id: id }).exec();
    }
}