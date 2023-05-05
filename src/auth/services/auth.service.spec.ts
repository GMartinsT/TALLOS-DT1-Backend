import { LoginResponse } from "src/helpers/res.login.swagger";
import { Role } from "../models/Role.enum";
import { AuthService } from "./auth.service";
import { Test, TestingModule } from "@nestjs/testing";
import { AuthRequest } from "../models/AuthRequest";

const loginRes: LoginResponse = {
    access_token: 'token123',
    email: 'gmt@mail.com',
    name: 'Guilherme',
    password: '1234',
    role: Role.Admin
}

describe('TesteService', () => {
    let authService: AuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [{
                provide: AuthService,
                useValue: {
                    login: jest.fn().mockResolvedValue(loginRes)
                }
            }],
        }).compile();

        authService = module.get<AuthService>(AuthService);
    });

    it('shoud be defined', () => {
        expect(authService).toBeDefined();
    });

    describe('login', () => {
        it('deve retornar o token e o usuário', async () => {
            //const body = {
            //    user: {
            //        email: 'gmt@mail.com',
            //        password: '1234',
            //        name: 'Guilherme',
            //        role: Role.Admin
            //    },
            //    access_token: 'token123'
            //} as unknown as AuthRequest;
            const body = {
                email: 'gmt@mail.com',
                password: '1234',
                name: 'Guilherme',
                role: Role.Admin
            }

            const result = await authService.login(body);
            expect(result).toEqual(loginRes);
            expect(authService.login).toHaveBeenCalledTimes(1);
            expect(authService.login).toHaveBeenCalledWith(body);
        });

        it('deve lançar uma exceção', async () => {
            const body = {
                    email: 'gmt1@mail.com',
                    password: '1234',
                    name: 'Guilherme',
                    role: Role.Admin
                };
            jest
                .spyOn(authService, 'login')
                .mockRejectedValueOnce(new Error('Erro de login'))

            await expect(authService.login(body)).rejects.toThrowError('Erro de login')
        });
    })
})