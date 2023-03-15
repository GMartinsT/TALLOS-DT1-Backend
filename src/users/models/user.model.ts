export class User {
    _id: string;
    name: string;
    email:string;
    password: string;
    role: string;

    constructor(User?: Partial<User>) {
        this._id = User?._id;
        this.name = User?.name;
        this.email = User?.email;
        this.password = User?.password;
        this.role = User?.role;
    }
}