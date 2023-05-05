import { Test, TestingModule } from '@nestjs/testing';
import { User, UserModel } from '../models/user.model';
import { UserService } from '../services/user.service';
import { Role } from '../../auth/models/Role.enum';

const UserList: UserModel[] = [
    new User({
        name: 'Admin1',
        email: 'admin1@mail.com',
        password: 'admin123',
        role: Role.Admin
    }),
    new User({
        name: 'Admin2',
        email: 'admin2@mail.com',
        password: 'admin123',
        role: Role.Admin
    }),
    new User({
        name: 'User1',
        email: 'user1@mail.com',
        password: 'user123',
        role: Role.User
    }),
    new User({
        name: 'User2',
        email: 'user2@mail.com',
        password: 'user123',
        role: Role.User
    })
]
const user = new User({
    name: 'Admin1', email: 'admin1@mail.com', password: 'admin123', role: Role.Admin
})

describe('TesteService', () => {
    let userService: UserService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [{
                provide: UserService,
                useValue: {
                    getAll: jest.fn().mockResolvedValue(UserList),
                    getById: jest.fn().mockResolvedValue(user),
                    getByEmail: jest.fn().mockResolvedValue(user),
                    create: jest.fn().mockResolvedValue(user),
                    update: jest.fn().mockResolvedValue(user),
                    delete: jest.fn().mockResolvedValue(true),
                }
            }],
        }).compile();

        userService = module.get<UserService>(UserService);
    });

    it('should be defined', () => {
        expect(userService).toBeDefined();
    });

    describe('getAll', () => {
        it('deve retornar uma lista de usuários', async () => {
            const result = await userService.getAll();

            expect(result).toEqual(UserList);
            expect(typeof result).toEqual('object');
            expect(userService.getAll).toHaveBeenCalledTimes(1);
        })

        it('deve lançar uma exeção', async () => {
            jest.spyOn(userService, 'getAll').mockRejectedValueOnce(new Error('!ERRO!'));

            await expect(userService.getAll()).rejects.toThrowError('!ERRO!');
        });
    });

    describe('getById', () => {
        it('deve retornar os dados do usuário', async () => {
            const id = '123id';
            const result = await userService.getById(id)
            expect(result).toEqual(user)
            expect(userService.getById).toHaveBeenCalledTimes(1)
        });

        it('deve lançar uma exeção', async () => {
            const id = '123id';
            jest.spyOn(userService, 'getById').mockRejectedValueOnce(new Error('!ERRO!'));

            await expect(userService.getById(id)).rejects.toThrowError('!ERRO!');
        });
    });

    describe('getByEmail', () => {
        it('deve retornar os dados do usuário', async () => {
            const email = 'admin1@gmail.com';
            const result = await userService.getByEmail(email)
            expect(result).toEqual(user)
            expect(userService.getByEmail).toHaveBeenCalledTimes(1)
        });

        it('deve lançar uma exeção', async () => {
            const email = 'admin1@mail.com';
            jest.spyOn(userService, 'getByEmail').mockRejectedValueOnce(new Error('!ERRO!'));

            await expect(userService.getByEmail(email)).rejects.toThrowError('!ERRO!');
        });
    });

    describe('create', () => {
        it('deve retornar sucesso ao criar o usuário', async () => {
            const body = {
                name: 'Admin1', email: 'admin1@mail.com', password: 'admin123', role: Role.Admin
            }
            const result = await userService.create(body);
            expect(result).toEqual(user)
            expect(userService.create).toHaveBeenCalledTimes(1)
            expect(userService.create).toHaveBeenCalledWith(body)
        });
        it('deve lançar uma exeção', async () => {
            const body = {
                name: 'Admin', email: 'admin@gmail.com', password: 'Admin123@', role: Role.Admin
            }
            jest.spyOn(userService, 'create').mockRejectedValueOnce(new Error('!ERRO!'));

            await expect(userService.create(body)).rejects.toThrowError('!ERRO!');
        })
    });

    describe('update', () => {
        it('deve atualizar infomações do usuário', async () => {
            const body = {
                name: 'Admin', email: 'admin@mail.com', password: 'admin123', role: Role.Admin
            }
            const id = '123id';
            const result = await userService.update(id, body)
            expect(result).toEqual(user)
            expect(userService.update).toHaveBeenCalledTimes(1)
        });
        it('deve lançar uma exeção', async () => {
            const body = {
                name: 'Admin', email: 'admin@gmail.com', password: 'Admin123@', role: Role.Admin
            }
            const id = '123id';
            jest.spyOn(userService, 'update').mockRejectedValueOnce(new Error('!ERRO!'));

            await expect(userService.update(id, body)).rejects.toThrowError('!ERRO!');
        })
    });

    describe('delete', () => {
        it('deve excluir um usuario', async () => {
            const id = '123id';
            const result = await userService.delete(id)
            expect(result).toEqual(true)
            expect(userService.delete).toHaveBeenCalledTimes(1)
        });
        it('deve lançar uma exeção', async () => {
            const id = '123id';
            jest.spyOn(userService, 'delete').mockRejectedValueOnce(new Error('!ERRO!'));
            await expect(userService.delete(id)).rejects.toThrowError('!ERRO!')
        })
    });
});
