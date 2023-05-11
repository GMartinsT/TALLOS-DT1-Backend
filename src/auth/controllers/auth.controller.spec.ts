import { AuthService } from "../services/auth.service";
import { AuthController } from "./auth.controller";
import { Test, TestingModule } from "@nestjs/testing";
import { LoginResponse } from "src/helpers/res.login.swagger";
import { Role } from "../models/Role.enum";
import { AuthRequest } from "../models/AuthRequest";


const loginRes: LoginResponse = {
    access_token: 'token123',
    email: 'gmt@mail.com',
    name: 'Guilherme',
    password: '1234',
    role: Role.Admin,
    _id: 'id123'
}

describe('TesteAuthController', () => {
    let authService: AuthService;
    let authController: AuthController;
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                {
                    provide: AuthService,
                    useValue: {
                        login: jest.fn().mockResolvedValue(loginRes)
                    }
                }
            ]
        }).compile();

        authService = module.get<AuthService>(AuthService)
        authController = module.get<AuthController>(AuthController)
    });

    it('shoud be defined', () => {
        expect(authService).toBeDefined();
        expect(authController).toBeDefined();
    });

    describe('login', () => {
        it('deve retornar o token e o usuário', async () => {
            const body = {
                user: {
                    email: 'gmt@mail.com',
                    password: '1234',
                    name: 'Guilherme',
                    role: Role.Admin
                },
                access_token: 'token123'  
            } as unknown as AuthRequest;

            const result = await authController.login(body);
            expect(result).toEqual(loginRes);
            expect(authService.login).toHaveBeenCalledTimes(1);
            expect(authService.login).toHaveBeenCalledWith(body.user);
        });

        it('deve lançar uma exceção', async () => {
            const body = {
                user: {
                    email: 'gmt1@mail.com',
                    password: '1234',
                    name: 'Guilherme',
                    role: Role.Admin
                },    
            } as AuthRequest;
            jest
                .spyOn(authService, 'login')
                .mockRejectedValueOnce(new Error('Erro de login'))

            await expect(authController.login(body)).rejects.toThrowError('Erro de login')
        });
    })
})