import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(body: {
        email: string;
        password: string;
        fullName: string;
    }): Promise<{
        access_token: string;
        user: {
            id: string;
            email: string;
            fullName: string | null;
        };
    }>;
    login(body: {
        email: string;
        password: string;
    }): Promise<{
        access_token: string;
        user: {
            id: string;
            email: string;
            fullName: string | null;
        };
    }>;
    me(req: {
        user: {
            userId: string;
        };
    }): Promise<{
        id: string;
        email: string;
        fullName: string | null;
    }>;
}
