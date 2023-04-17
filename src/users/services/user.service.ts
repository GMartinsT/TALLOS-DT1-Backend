import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserModel } from "../models/user.model";
import * as bcrypt from 'bcryptjs';
import { SocketGateway } from "src/sockets/socket.gateway";

@Injectable()
export class UserService {

    constructor(@InjectModel('User') private userModel: Model<User>, private socketGateway: SocketGateway) { }

    async getAll() {
        return await this.userModel.find().exec();
    }

    async getByEmail(email: string) {
        return await this.userModel.findOne({ email }).exec();
    }

    async getById(id: string) {
        return await this.userModel.findById(id).exec();
    }

    async create(user: User): Promise<UserModel> {
        user.password = await bcrypt.hash(user.password, 10)
        const createdUser = new this.userModel(user);
        this.socketGateway.emitNewUser(user);
        return await createdUser.save();
    }

    async update(id: string, user: User) {
        const updatedUser = await this.userModel.updateOne(
            { _id: id },
            { $set: user },
            { new: true }
        )

        this.socketGateway.emitUpdateUser('id');

        return updatedUser
    }

    async delete(id: string) {
        this.socketGateway.emitRemoveUser(id)
        return await this.userModel.deleteOne({ _id: id }).exec();
    }
}